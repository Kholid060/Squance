<template>
  <div>
    <button-ui type="primary" @click="state.modal = !state.modal">
      <v-mdi name="mdi-plus" class="mr-1"></v-mdi>
      Animation
    </button-ui>
    <modal-ui v-model="state.modal">
      <card-ui width="400px">
        <template #header>New Animation</template>
        <div class="flex flex-col md:flex-row mb-4">
          <input-ui
            block
            hide-details
            label="Name"
            placeholder="Animation name"
            :model-value="state.animation.name"
            @input="animationName"
          ></input-ui>
          <input-ui
            block
            hide-details
            class="mt-3 md:mt-0 md:ml-3"
            label="Animation target"
            placeholder=".target"
            v-model="state.animation.target"
          ></input-ui>
        </div>
        <div class="my-4">
          <button-ui
            v-for="btn in btns"
            :key="btn"
            :type="state.activeBtn === btn ? 'primary' : 'default'"
            class="mr-2 capitalize"
            @click="state.activeBtn = btn;"
          >
            {{ btn }}
          </button-ui>
        </div>
        <code-flask
          v-if="state.activeBtn !== 'description'"
          class="rounded-lg"
          height="200px"
          v-model:code="state.animation[state.activeBtn]"
          :language="state.activeBtn"
        ></code-flask>
        <textarea-ui
          hide-details
          block
          height="170px"
          placeholder="Animation description"
          v-else
          v-model="state.animation.description"
        ></textarea-ui>
        <button-ui
          @click="addAnimation"
          type="primary"
          block
          class="mt-8"
          :disabled="!state.animation.name"
        >
          Add Animation
        </button-ui>
      </card-ui>
    </modal-ui>
  </div>
</template>
<script>
import { reactive, defineAsyncComponent } from 'vue';
import store from '~/store';

export default {
  components: {
    CodeFlask: defineAsyncComponent(() => import('~/components/UI/CodeFlask.vue')),
  },
  setup() {
    const state = reactive({
      animation: {
        name: '',
        target: '',
        html: '',
        css: '',
        description: '',
      },
      activeBtn: 'description',
      modal: false,
    });

    return {
      state,
      btns: ['description', 'html', 'css'],
      animationName: ({ target }) => {
        state.animation.name = target.value.replace(/\s/g, '');
      },
      addAnimation: () => {
        store.dispatch('animation/add', state.animation);
        state.modal = false;
      },
    };
  },
};
</script>
