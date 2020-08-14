<template>
  <div id="app">
    <Nav></Nav>
    <main class="pt-16 h-screen" v-if="loaded">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import localforage from 'localforage';
import Nav from './components/Layout/Nav.vue';
import store from '~/store';

export default {
  components: { Nav },
  setup() {
    const watchStateKeys = ['keyframe', 'animation', 'property'];
    const loaded = ref(false);

    store.dispatch('retrieveData').then(() => {
      loaded.value = true;

      watchStateKeys.forEach((key) => {
        watch(store.state[key].entity, (value) => {
          localforage.setItem(key, JSON.parse(JSON.stringify(value)));
        }, { deep: true });
      });
    });

    return {
      loaded,
    };
  },
};
</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 600ms ease;
}

.slide-enter-from {
  transform: translateX(-50px);
  opacity: 0;
};

.slide-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
