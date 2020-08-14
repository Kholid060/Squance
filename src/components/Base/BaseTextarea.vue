<template>
  <div class="input-ui" :class="{ block, disabled }">
    <textarea
      class="input-ui__container textarea"
      :style="{ height }"
      :class="{ error }"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emitEvent"
    ></textarea>
    <div v-if="!hideDetails" class="input-ui__details h-6">
      <transition name="slide-fade">
        <span
          v-if="error"
          class="error-message inline-block text-sm text-danger"
        >
          {{ errorMessage }}
        </span>
      </transition>
    </div>
  </div>
</template>
<script>
import '~/assets/scss/components/_input.scss';

export default {
  name: 'TextareaUi',
  props: {
    name: String,
    modelValue: String,
    placeholder: String,
    errorMessage: String,
    error: Boolean,
    disabled: Boolean,
    block: Boolean,
    hideDetails: Boolean,
    height: [String, Number],
  },
  methods: {
    emitEvent(event) {
      const { value } = event.target;

      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
  },
};
</script>
