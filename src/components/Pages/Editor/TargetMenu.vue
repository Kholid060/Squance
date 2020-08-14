<template>
  <div class="bg-white p-5 border-r flex flex-col items-center">
    <popover-ui placement="right-start" :disabled="isPlaying">
      <button-ui :disabled="isPlaying" icon v-tooltip:right="'Animation HTML'">
        <v-mdi name="mdi-xml"></v-mdi>
      </button-ui>
      <template #popover>
        <card-ui class="shadow-xl">
          <template v-slot:header>
            <input-ui
              block
              label="Animation target selector"
              placeholder=".target"
              :error-message="targetNotFound ? 'Target not found' : ''"
              :hide-details="!targetNotFound"
              :modelValue="animation.target"
              @change="updateAnimation('target', $event)"
            ></input-ui>
          </template>
          <p class="text-lighter text-sm mb-1">HTML Code</p>
          <code-flask
            :code="animation.html"
            @change="updateAnimation('html', $event)"
            class="w-64"
            language="html"
          ></code-flask>
        </card-ui>
      </template>
    </popover-ui>
    <popover-ui placement="right-start" :disabled="isPlaying">
      <button-ui :disabled="isPlaying" icon class="mt-4" v-tooltip:right="'Animation CSS'">
        <v-mdi name="mdi-code-json"></v-mdi>
      </button-ui>
      <template #popover>
        <card-ui class="shadow-xl">
          <p class="text-lighter text-sm mb-1">CSS Code</p>
          <code-flask
            :code="animation.css"
            @change="updateAnimation('css', $event)"
            class="w-64"
            language="css"
          ></code-flask>
        </card-ui>
      </template>
    </popover-ui>
    <div
      v-if="targetNotFound"
      class="cursor-pointer mt-4 bg-red-500 rounded-lg p-2 bg-opacity-25"
      v-tooltip:right="'Animation target not found'"
    >
      <v-mdi class="text-danger" name="mdi-alert-circle"></v-mdi>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent, computed, ref } from 'vue';
import debounce from 'lodash.debounce';
import store from '~/store';

export default {
  components: {
    CodeFlask: defineAsyncComponent(() => import('~/components/UI/CodeFlask.vue')),
  },
  setup() {
    const targetNotFound = ref(false);
    const animation = computed(() => store.getters['animation/active']);
    const isPlaying = computed(() => store.state.playing);
    const checkAnimationTarget = () => {
      const selector = animation.value.target;

      if (selector !== '') {
        try {
          const div = document.createElement('div');
          div.innerHTML = animation.value.html;
          targetNotFound.value = !div.querySelector(selector);
        } catch (err) {
          targetNotFound.value = true;
        }
      } else {
        targetNotFound.value = true;
      }
    };
    const updateAnimation = debounce((key, value) => {
      if (typeof value === 'string') {
        store.dispatch('animation/update', {
          [key]: value,
        });

        if (key === 'html' || key === 'target') checkAnimationTarget();
      }
    }, 1000);

    return {
      isPlaying,
      animation,
      targetNotFound,
      updateAnimation,
    };
  },
};
</script>
