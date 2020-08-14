<template>
  <div class="h-full flex justify-center items-center" ref="animationContainer">
  </div>
</template>
<script>
import {
  computed,
  onMounted,
  watch,
  shallowReactive,
  ref,
  toRef,
} from 'vue';
import emitter from 'tiny-emitter/instance';
import store from '~/store';
import { parseKeyframe } from '~/utils/helper';
import animate from '~/utils/animate';

export default {
  setup() {
    const state = shallowReactive({
      targetAnimation: null,
    });
    const animationContainer = ref(null);
    const animation = computed(() => store.getters['animation/active']);
    const properties = computed(() => store.getters['property/active']);
    const keyframes = computed(() => store.getters['keyframe/active']);
    const insertAnimation = () => {
      const keyframesArr = parseKeyframe(keyframes.value);
      const options = properties.value;

      state.targetAnimation = animate({
        target: animation.value.target,
        keyframes: keyframesArr,
        options: {
          ...options,
          easing: /,(?![^()]*\))/.test(options.easing)
            ? `cubic-bezier(${options.easing})`
            : options.easing,
        },
        root: animationContainer.value.shadowRoot,
      });
    };

    emitter.on('stop', () => {
      state.targetAnimation.stop();
    });
    emitter.on('restart', () => {
      state.targetAnimation.restart();
    });

    onMounted(() => {
      animationContainer.value.attachShadow({ mode: 'open' });
      animationContainer.value.shadowRoot.innerHTML = `
        <div id="animationContainer">${animation.value.html}</div>
        <style>${animation.value.css}</style>
      `;

      if (animation.value.target !== '') {
        insertAnimation();
      }
    });
    watch(animation, ({ target, html, css }, old) => {
      if (target !== '') {
        try {
          const shadow = animationContainer.value.shadowRoot;
          if (old.css !== css) {
            const style = shadow.querySelector('style');
            style.innerHTML = css;
          } else {
            const container = shadow.getElementById('animationContainer');
            container.innerHTML = html;
            const element = container.querySelector(target);

            if (element) insertAnimation();
          }
        } catch (err) {
          console.error(err);
        }
      }
    }, { deep: true });
    watch([keyframes, properties], ([newKeyframes, newProperties]) => {
      const targetEffect = state.targetAnimation.effect;

      targetEffect.setKeyframes(parseKeyframe(newKeyframes));
      targetEffect.updateTiming(newProperties);
    },
    { deep: true });
    watch(toRef(store.state, 'playing'), (playing) => {
      if (playing) state.targetAnimation.play();
      else state.targetAnimation.pause();
    });

    return {
      animationContainer,
    };
  },
};
</script>
