<template>
  <div class="flex items-center">
    <button-ui icon class="mr-5" @click="toggleProperties">
      <v-mdi
        :name="showProperties ? 'mdi-chevron-down' : 'mdi-cog'"
        :rotate="90"
      ></v-mdi>
    </button-ui>
    <button-ui
      @click="addKeyframe"
      :type="isAdding ? 'danger' : 'default'"
      :disabled="playing"
      icon
    >
      <v-mdi name="mdi-plus" :rotate="isAdding ? 45 : 0"></v-mdi>
      <span class="mr-2 ml-1 hidden md:block">{{ isAdding ? 'Cancel' : 'Keyframe' }}</span>
    </button-ui>
    <button-ui
      class="p-2 rounded-lg text-danger ml-4"
      :disabled="activeKeyframe === 0 || playing"
      @click="deleteKeyframe"
      icon
    >
      <v-mdi name="mdi-delete"></v-mdi>
      <span class="mr-2 ml-1 hidden md:block">Keyframe</span>
    </button-ui>
    <div class="flex-grow"></div>
    <slide-transition direction="right" mode="out-in">
      <button-ui
        icon
        class="text-red-500"
        @click="stopAnimation"
        v-if="playing"
      >
        <v-mdi name="mdi-stop"></v-mdi>
        <span class="mr-2 ml-1 hidden md:block">Stop</span>
      </button-ui>
      <button-ui v-else icon @click="restartAnimation">
        <v-mdi name="mdi-restart"></v-mdi>
        <span class="mr-2 ml-1 hidden md:block">Restart</span>
      </button-ui>
    </slide-transition>
    <button-ui
      icon
      class="ml-5"
      type="primary"
      @click="togglePlaying"
      :disabled="isAdding"
      :class="{ 'shadow-xl': playing }"
    >
      <v-mdi :name="playing ? 'mdi-pause' : 'mdi-play'"></v-mdi>
      <span class="mr-2 ml-1 hidden md:block">{{ playing ? 'Pause' : 'Play' }}</span>
    </button-ui>
  </div>
</template>
<script>
import { computed } from 'vue';
import emitter from 'tiny-emitter/instance';
import SlideTransition from '~/components/Transitions/SlideTransition.vue';
import store from '~/store';

export default {
  components: { SlideTransition },
  props: {
    isAdding: Boolean,
    handle: [Object, Animation],
  },
  setup(props, { emit }) {
    const playing = computed(() => store.state.playing);
    const activeKeyframe = computed(() => store.state.keyframe.active);

    const toggleProperties = () => {
      store.commit('setState', {
        key: 'showProperties',
        data: !store.state.showProperties,
      });
    };

    const togglePlaying = () => {
      if (playing.value) props.handle.pause();
      else props.handle.play();

      store.commit('setState', {
        key: 'playing',
        data: !playing.value,
      });
    };
    const stopAnimation = () => {
      props.handle.stop();

      store.commit('setState', {
        key: 'playing',
        data: false,
      });

      emitter.emit('stop', true);
    };
    const restartAnimation = () => {
      props.handle.restart();
      emitter.emit('restart', true);
    };

    return {
      playing,
      stopAnimation,
      activeKeyframe,
      restartAnimation,
      showProperties: computed(() => store.state.showProperties),
      addKeyframe: () => emit('update:is-adding', !props.isAdding),
      deleteKeyframe: () => store.dispatch('keyframe/delete'),
      toggleProperties,
      togglePlaying,
    };
  },
};
</script>
