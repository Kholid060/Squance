<template>
  <label class="switch" :class="{ disabled }">
    <input
      id="checkbox"
      v-model="checked"
      type="checkbox"
      class="switch-input"
    />
    <div class="slider round"></div>
  </label>
</template>
<script>
import '~/assets/scss/components/_switch.scss';

export default {
  name: 'SwitchUi',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
  },
  computed: {
    checked: {
      set(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
      get() {
        return this.value;
      },
    },
  },
};
</script>
