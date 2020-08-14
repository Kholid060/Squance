<template>
  <div class="flex text-center">
    <input
      type="number"
      placeholder="4000ms"
      :value="properties.duration"
      @change="updateProperties({ duration: Math.abs(+$event.target.value) })"
      class="w-4/12 px-1 mr-2 border-b border-dashed"
    >
    <input
      type="number"
      @change="updateIteration"
      :value="properties.iterations"
      placeholder="infinite"
      class="w-4/12 px-1 mr-2 border-b border-dashed"
    >
    <popover-ui placement="top" class="w-4/12 mr-2 border-b border-dashed cursor-pointer">
      <p class="w-full text-overflow px-1">{{ properties.direction }}</p>
      <template #popover>
        <card-ui class="shadow-xl">
          <list-ui
            v-for="direction in options.directions"
            :key="direction"
            :active="properties.direction === direction"
            class="mb-1"
            @click="updateProperties({ direction })"
          >
            {{ direction }}
          </list-ui>
        </card-ui>
      </template>
    </popover-ui>
    <popover-ui placement="top" class="w-4/12 mr-2 border-b border-dashed cursor-pointer">
      <p
        class="w-full text-overflow px-1"
        :title="properties.easing"
      >{{ properties.easing }}</p>
      <template #popover>
        <card-ui class="shadow-xl">
          <list-ui
            v-for="timing in options.easing"
            :key="timing"
            :active="timing === properties.easing"
            class="mb-1"
            @click="updateEasing(timing)"
          >
            {{ timing }}
          </list-ui>
          <list-ui
            :active="properties.easing.startsWith('cubic-bezier')"
            @click="updateEasing('cubic-bezier')"
          >
            cubic-bezier(
              <template v-for="(value, idx) in cubicBezier">
                <input
                  type="numbber"
                  v-bind="{ value }"
                  @change="updateCubicBezier($event.target.value, idx)"
                  class="w-6 text-center"
                  :placeholder="0"
                  :key="idx"
                >
                <span :key="idx" v-show="idx !== 3">,</span>
              </template>
            )
          </list-ui>
        </card-ui>
      </template>
    </popover-ui>
    <popover-ui placement="top" class="w-4/12 mr-2 border-b border-dashed cursor-pointer">
      <p class="w-full text-overflow px-1">{{ properties.fill }}</p>
      <template #popover>
        <card-ui class="shadow-xl">
          <list-ui
            v-for="fill in options.fill"
            :key="fill"
            :active="fill === properties.fill"
            class="mb-1"
            @click="updateProperties({ fill })"
          >
            {{ fill }}
          </list-ui>
        </card-ui>
      </template>
    </popover-ui>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import debounce from 'lodash.debounce';
import store from '~/store';

export default {
  setup() {
    const properties = computed(() => store.getters['property/active']);
    const cubicBezier = ref([0, 0, 0, 0]);
    const options = {
      directions: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
      easing: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
      fill: ['none', 'forwards', 'backwards', 'both'],
    };
    const updateProperties = debounce((data) => {
      store.dispatch('property/update', {
        ...data,
      });
    }, 500);
    const updateEasing = (easing) => updateProperties({
      easing: easing === 'cubic-bezier'
        ? `cubic-bezier(${cubicBezier.value.join(',')})`
        : easing,
    });
    const updateCubicBezier = (value, index) => {
      let newVal = +value;

      if ((index + 1) % 2 === 1) {
        newVal = Math.abs(newVal);

        if (newVal > 1) {
          newVal = 1;
        }
      }

      cubicBezier.value[index] = newVal;
      if (properties.value.easing.startsWith('cubic-bezier')) updateEasing('cubic-bezier');
    };

    return {
      options,
      properties,
      cubicBezier,
      updateEasing,
      updateProperties,
      updateCubicBezier,
      updateIteration: ({ target }) => updateProperties({
        iterations: target.value === '' ? Infinity : +target.value,
      }),
    };
  },
};
</script>
<style scoped lang="scss">
input {
  &:focus {
    outline: none;
  }
  text-align: center;
  background-color: transparent;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}
</style>
