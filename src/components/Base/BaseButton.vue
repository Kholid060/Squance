<template>
  <button
    class="button-ui rounded-lg justify-center inline-flex items-center p-2 focus:outline-none"
    :class="[
      classes,
      {
        'px-4': !icon,
        'w-full block': block,
        'text-white': type !== 'default',
      }
    ]"
    v-bind="{ disabled }"
  >
    <circular-progress-ui
      v-if="loading"
      spinner
      :size="25"
      :color="type === 'default' ? 'var(--primary)' : 'white'"
    ></circular-progress-ui>
    <slot v-else></slot>
  </button>
</template>
<script>
import { computed } from 'vue';
import CircularProgressUi from './BaseCircularProgress.vue';

export default {
  name: 'ButtonUi',
  components: { CircularProgressUi },
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'secondary',
          'primary',
          'warning',
          'danger',
        ].includes(value);
      },
    },
    width: [Number, String],
    height: [Number, String],
    dark: Boolean,
    disabled: Boolean,
    block: Boolean,
    loading: Boolean,
    round: Boolean,
    small: Boolean,
    icon: Boolean,
    plain: Boolean,
    large: Boolean,
  },
  setup(props) {
    const buttonClasses = {
      default: 'bg-input hover:bg-input-dark',
      primary: 'bg-blue-600 hover:bg-blue-500',
      danger: 'bg-red-500 hover:bg-red-400',
    };

    return {
      classes: computed(() => buttonClasses[props.type || 'default']),
    };
  },
};
</script>
<style lang="scss" scoped>
.button-ui {
  transition: all .2s ease;
  &[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
