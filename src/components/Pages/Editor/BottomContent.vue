<template>
  <div class="bg-white flex overflow-hidden" style="height: 220px">
    <slide-transition direction="left">
      <animation-properties
        v-show="showProperties"
        class="bg-white lg:relative absolute z-30 top-0 p-5 left-0 overflow-auto"
      ></animation-properties>
    </slide-transition>
    <div
      class="absolute h-full w-full block bg-black z-10 bg-opacity-25 lg:hidden cursor-pointer"
      v-show="showProperties"
      @click="hideProperties"
    ></div>
    <timeline class="p-5"></timeline>
  </div>
</template>
<script>
import { computed } from 'vue';
import store from '~/store';
import AnimationProperties from './BottomContent/AnimationProperties.vue';
import Timeline from './BottomContent/Timeline.vue';
import SlideTransition from '~/components/Transitions/SlideTransition.vue';

export default {
  components: { AnimationProperties, Timeline, SlideTransition },
  setup() {
    return {
      showProperties: computed(() => store.state.showProperties),
      hideProperties: () => {
        store.commit('setState', {
          key: 'showProperties',
          data: false,
        });
      },
    };
  },
};
</script>
