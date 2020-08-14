<template>
  <nav class="h-16 text-white bg-gray-800 px-5 absolute w-full nav flex items-center">
    <router-link class="text-lg font-semibold" to="/">
      Squance
    </router-link>
    <label
      v-if="$route.name === 'Editor'"
      title="Animation name"
      class="ml-4 pl-4 md:ml-8 md:pl-8 border-l"
      style="border-color: rgba(255, 255, 255, 0.2)"
    >
      <input
        :value="activeAnimation.name"
        @change="updateAnimationName"
        class="bg-transparent w-32"
      >
      <v-mdi name="mdi-pencil" size="20" class="ml-2"></v-mdi>
    </label>
    <div class="flex-grow"></div>
    <export-animation v-if="$route.name === 'Editor'"></export-animation>
    <new-animation v-else></new-animation>
  </nav>
</template>
<script>
import { computed } from 'vue';
import store from '~/store';
import ExportAnimation from './Nav/ExportAnimation.vue';
import NewAnimation from './Nav/NewAnimation.vue';

export default {
  components: { ExportAnimation, NewAnimation },
  setup() {
    const activeAnimation = computed(() => store.getters.activeAnimation);
    const updateAnimationName = ({ target }) => {
      store.dispatch('animation/update', {
        name: target.value.replace(/\s/g, ''),
      });
    };

    return {
      activeAnimation,
      updateAnimationName,
    };
  },
};
</script>
<style scoped>
.nav {
  backdrop-filter: blur(4px);
}
</style>
