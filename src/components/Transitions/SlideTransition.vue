<template>
  <transition v-bind="{ mode }" :name="`slide-${direction}`">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  props: {
    mode: String,
    direction: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
$directions: (
  'top': translateY(-10px),
  'right': translateX(10px),
  'bottom': translateY(10px),
  'left': translateX(-10px)
);

@each $direction, $translate in $directions {
  .slide-#{$direction}-enter-active,
  .slide-#{$direction}-leave-active {
    transition: all 300ms ease;
  }
  .slide-#{$direction}-enter-from,
  .slide-#{$direction}-leave-to {
    transform: $translate;
    opacity: 0;
  }
}
</style>
