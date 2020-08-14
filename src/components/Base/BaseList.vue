<template>
  <div
    :class="{ dense, active, hover, disabled }"
    class="list-ui  p-3 flex items-center text-light rounded-lg"
  >
    <div class="prefix">
      <slot name="prefix"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import '~/assets/scss/components/_list.scss';

export default {
  name: 'ListUi',
  props: {
    dense: Boolean,
    active: Boolean,
    disabled: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
    to: [String, Object],
    hover: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
