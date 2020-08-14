<template>
  <div class="overflow-auto bg-white scroll" style="width: 330px">
    <div class="p-5">
      <h5 class="text-lg font-semibold mb-8">
        CSS Properties
        <span class="ml-1">({{ activeKeyframe }}%)</span>
      </h5>
      <form @change="updateCSSProperty" class="mb-4" autocomplete="off">
        <div class="flex mb-4 items-center" v-for="(value, key) in CSSProperties" :key="key">
          <label
            :for="key"
            class="w-5/12 text-overflow capitalize"
            :title="key"
          >{{ key }}</label>
          <input
            type="text"
            :name="key"
            :value="value"
            class="w-6/12 bg-input focus:outline-none py-2 px-3 mx-2 rounded-lg"
          >
          <v-mdi
            :title="`Remove ${key}`"
            @click="deleteProperty(key)"
            name="mdi-delete"
            class="text-danger cursor-pointer"
          ></v-mdi>
        </div>
      </form>
      <form class="flex mb-4" @change="addProperty">
        <input
          type="text"
          v-model="state.key"
          placeholder="Key"
          class="w-5/12 bg-input focus:outline-none py-2 px-3 rounded-lg"
        >
        <input
          type="text"
          v-model="state.value"
          placeholder="Value"
          class="w-7/12 bg-input focus:outline-none py-2 px-3 ml-2 rounded-lg"
        >
      </form>
      <div class="text-lighter text-sm">
        Input key and value to add CSS Property.
      </div>
    </div>
  </div>
</template>
<script>
import { computed, shallowReactive } from 'vue';
import debounce from 'lodash.debounce';
import camelcase from 'lodash.camelcase';
import store from '~/store';

export default {
  setup() {
    const state = shallowReactive({
      key: '',
      value: '',
    });
    const activeKeyframe = computed(() => store.state.keyframe.active);
    const CSSProperties = computed(() => store.getters['keyframe/active'][activeKeyframe.value]);
    const updateKeyframe = debounce((data) => (
      store.dispatch('keyframe/update', data)
    ), 500);
    const updateCSSProperty = ({ target }) => updateKeyframe({
      [target.name]: target.value,
    });
    const addProperty = () => {
      const isValid = (key) => state[key] !== '';

      if (isValid('key') && isValid('value')) {
        updateKeyframe({
          [camelcase(state.key)]: state.value,
        });
        state.key = '';
        state.value = '';
      }
    };

    return {
      state,
      addProperty,
      CSSProperties,
      deleteProperty: (key) => store.dispatch('keyframe/deleteProperty', key),
      activeKeyframe,
      updateCSSProperty,
    };
  },
};
</script>
