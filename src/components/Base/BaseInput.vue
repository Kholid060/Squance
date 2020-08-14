<template>
  <div
    class="input-ui"
    :class="[{ error, large, block, disabled }, type]"
    @click="$emit('click', $event)"
  >
    <label v-if="label" class="mb-1 inline-block text-sm text-lighter">
      {{ label }}
    </label>
    <div class="input-ui__container" :class="{ error }">
      <v-mdi v-if="!!icon" class="prefix-icon" :name="icon"></v-mdi>
      <input
        v-autofocus="autofocus"
        :type="nativeType"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :style="{ width, height }"
        @blur="$emit('blur', $event)"
        @input="emitEvent"
      />
      <v-mdi
        v-if="!!suffixIcon"
        class="cursor-pointer suffix-icon"
        :name="suffixIcon"
        @click="$emit('click-suffix', $event)"
      ></v-mdi>
    </div>
    <div v-if="!hideDetails" class="input-ui__details h-6">
      <transition name="slide-fade">
        <span
          v-if="errorMessage || error"
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
  name: 'InputUi',
  directives: {
    autofocus: {
      inserted(el, { value = true }) {
        if (!value) return;

        el.focus();
      },
    },
  },
  props: {
    name: String,
    label: String,
    modelValue: [Number, String],
    icon: String,
    errorMessage: String,
    placeholder: String,
    large: Boolean,
    block: Boolean,
    disabled: Boolean,
    suffixIcon: String,
    autofocus: Boolean,
    error: Boolean,
    width: [String, Number],
    height: [String, Number],
    hideDetails: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'outline', 'background'].includes(value);
      },
    },
    nativeType: {
      type: String,
      default: 'text',
    },
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
