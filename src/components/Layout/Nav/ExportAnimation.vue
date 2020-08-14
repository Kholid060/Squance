<template>
  <modal-ui>
    <template #activator>
      <button-ui type="primary">
        <v-mdi name="mdi-export-variant" size="20"></v-mdi>
        <span class="ml-2 mr-1">Export</span>
      </button-ui>
    </template>
    <card-ui class="shadow-xl" width="400px">
      <template #header>
        Export Animation
      </template>
      <div class="mb-3">
        <button-ui
          :type="activeButton === 'css' ? 'primary' : 'default'"
          @click="activeButton = 'css'"
        >
          CSS
        </button-ui>
        <button-ui
          :type="activeButton === 'html' ? 'primary' : 'default'"
          @click="activeButton = 'html'"
          class="ml-2"
        >
          HTML
        </button-ui>
      </div>
      <code-flask :code="code" :readonly="true"></code-flask>
    </card-ui>
  </modal-ui>
</template>
<script>
import { computed, defineAsyncComponent, ref } from 'vue';
import { formatCSS } from '~/utils/helper';
import store from '~/store';

export default {
  components: {
    CodeFlask: defineAsyncComponent(() => import('~/components/UI/CodeFlask.vue')),
  },
  setup() {
    const activeButton = ref('css');
    const activeAnimation = computed(() => store.getters.activeAnimation);
    const code = computed(() => (
      activeButton.value === 'css' ? formatCSS(activeAnimation.value) : activeAnimation.value.html
    ));

    return {
      code,
      activeButton,
    };
  },
};
</script>
