<template>
  <button
    class="absolute keyframe focus:outline-none"
    :class="{ 'active z-10': active }"
    v-bind="{ position }"
    :style="{ left: `${position}%` }"
  >
  </button>
</template>
<script>
export default {
  props: {
    position: {
      type: [Number, String],
      default: 0,
    },
    timelineWidth: {
      type: Number,
      default: 0,
    },
    text: String,
    active: Boolean,
  },
};
</script>
<style lang="scss">
.keyframe {
  &:before {
    content: attr(position);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2.4rem;
    transition: all .2s ease;
    @apply w-10 bg-white rounded-full shadow-xl;
  }
  &:not(.active):hover {
    &:before {
      line-height: 3rem;
      @apply w-12;
    }
    z-index: 15;
  }
  &.active:before {
    line-height: 3rem;
    @apply bg-blue-600 text-white w-12;
  }
  &.new {
    z-index: 16;
  }
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  transition: all .2s ease;
}
</style>
