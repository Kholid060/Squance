<template>
  <div class="flex-1">
    <controller
      v-model:is-adding="state.isAdding"
      :handle="state.handle"
    ></controller>
    <div class="mt-5 relative px-2 bg-input px-8 rounded-lg overflow-hidden" style="height: 120px">
      <div class="relative h-full" ref="timeline">
        <span
          class="absolute h-full play bg-red-400 left-0 handle"
          style="width: 2px"
        ></span>
        <keyframe
          v-if="state.isAdding"
          :class="{ 'opacity-0 invisible': activeAnimation.keyframes[state.keyframePosition] }"
          active
          :position="state.keyframePosition"
          class="new"
          @click="addKeyframe"
        ></keyframe>
        <keyframe
          v-for="(data, keyframe) in activeAnimation.keyframes"
          @click="setActiveKeyframe(keyframe)"
          :active="activeKeyframe === +keyframe"
          :position="keyframe"
          :key="keyframe"
        ></keyframe>
        <div class="lines">
          <div
            v-for="i in 9"
            :key="i"
            class="absolute border line border-dashed"
            :style="{ left: `${i * 10}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  watch,
  computed,
  ref,
  toRef,
  shallowReactive,
  onMounted,
} from 'vue';
import animate from '~/utils/animate';
import Controller from './Controller.vue';
import Keyframe from './Keyframe.vue';
import store from '~/store';

export default {
  components: { Keyframe, Controller },
  setup() {
    const state = shallowReactive({
      isAdding: false,
      keyframePosition: 0,
      handle: {},
    });
    const timeline = ref(null);
    const activeAnimation = computed(() => store.getters.activeAnimation);

    onMounted(() => {
      const animation = animate({
        target: '.handle',
        keyframes: [{ left: 0 }, { left: '100%' }],
        options: {
          duration: activeAnimation.value.properties.duration,
          iterations: activeAnimation.value.properties.iterations,
          easing: 'linear',
        },
      });
      animation.onfinish = () => {
        store.commit('setState', {
          key: 'playing',
          data: false,
        });
        animation.stop();
      };
      watch(
        () => [activeAnimation.value.properties, activeAnimation.value.html],
        ([{ duration, iterations }, html], old) => {
          animation.effect.updateTiming({ duration, iterations });

          if (html !== old[1]) {
            state.handle.restart();
          }
        },
      );

      state.handle = animation;
    });

    const addKeyframe = () => new Promise((resolve, reject) => {
      if (activeAnimation.value.keyframes[state.keyframePosition]) reject();

      store.dispatch('keyframe/add', state.keyframePosition).then(() => {
        state.keyframePosition = 0;
        state.isAdding = false;
        resolve();
      });
    });
    const setActiveKeyframe = (position) => {
      store.commit('keyframe/activeKeyframe', +position);
    };

    const mousemove = (event) => {
      const { left, width } = timeline.value.getBoundingClientRect();
      const position = Math.floor(((event.clientX - left) / width) * 100);

      if (position < 0) {
        state.keyframePosition = 0;
        return;
      }
      if (position > 100) {
        state.keyframePosition = 100;
        return;
      }

      state.keyframePosition = position;
    };
    const keyup = ({ key }) => {
      if (key === 'Escape') {
        state.isAdding = false;
      }
    };
    const cleanup = () => {
      state.keyframePosition = 0;
      document.removeEventListener('keyup', keyup);
      timeline.value.removeEventListener('mousemove', mousemove);
    };

    watch([toRef(state, 'isAdding')], (value) => {
      if (value) {
        document.addEventListener('keyup', keyup);
        timeline.value.addEventListener('mousemove', mousemove);
      } else {
        cleanup();
      }
    });

    return {
      activeKeyframe: computed(() => store.state.keyframe.active),
      activeAnimation,
      setActiveKeyframe,
      timeline,
      state,
      addKeyframe,
    };
  },
};
</script>
<style scoped lang="scss">
.handle {
  &:before {
    @apply bg-red-400;
    content: "";
    position: absolute;
    height: 12px;
    width: 12px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  }
}

.lines {
  .line {
    height: 60%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
