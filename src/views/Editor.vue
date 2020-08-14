<template>
  <div class="editor h-full">
    <div class="h-full" style="padding-bottom: 220px">
      <div class="flex h-full relative">
        <target-menu></target-menu>
        <div class="flex-1 h-full scroll overflow-auto p-5">
          <target-content></target-content>
        </div>
        <css-properties
          v-show="showCssProperties"
          class="border-l lg:block lg:relative absolute right-0 h-full z-20"
        ></css-properties>
        <button-ui
          icon
          class="absolute z-40 top-0 right-0 m-4"
          @click="toggleCssProperties"
          :class="{ 'shadow-xl': !showCssProperties }"
        >
          <v-mdi :name="!showCssProperties ? 'mdi-menu' : 'mdi-close'"></v-mdi>
        </button-ui>
        <div
          @click="toggleCssProperties"
          v-show="showCssProperties"
          class="absolute h-full w-full block bg-black z-10 bg-opacity-25 lg:hidden cursor-pointer"
        ></div>
      </div>
    </div>
    <bottom-content class="absolute border-t bottom-0 w-full"></bottom-content>
  </div>
</template>
<script>
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import BottomContent from '~/components/Pages/Editor/BottomContent.vue';
import CssProperties from '~/components/Pages/Editor/CssProperties.vue';
import TargetContent from '~/components/Pages/Editor/TargetContent.vue';
import TargetMenu from '~/components/Pages/Editor/TargetMenu.vue';
import store from '~/store';

export default {
  components: {
    BottomContent,
    CssProperties,
    TargetContent,
    TargetMenu,
  },
  setup() {
    const showCssProperties = ref(true);

    onBeforeRouteLeave(() => {
      store.commit('setState', {
        key: 'playing',
        data: false,
      });
    });

    return {
      showCssProperties,
      toggleCssProperties: () => {
        showCssProperties.value = !showCssProperties.value;
      },
    };
  },
};
</script>
