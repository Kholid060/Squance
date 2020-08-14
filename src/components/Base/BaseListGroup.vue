<template>
  <div class="list-ui-group">
    <div
      class="list-ui activator text-light py-2 pl-2 flex cursor-pointer relative"
      :class="{ 'active-group': open }"
      @click="open = !open"
    >
      <div class="prefix" v-if="prefixIcon || $slots.prefix">
        <v-mdi v-if="prefixIcon" :name="prefixIcon"></v-mdi>
        <slot v-else-if="$slots.prefix" name="prefix"></slot>
      </div>
      <div class="flex-1 overflow-hidden pr-1">
        <slot name="activator"></slot>
      </div>
      <v-mdi name="mdi-chevron-down" :rotate="open ? 180 : 0"></v-mdi>
    </div>
    <expand-transition>
      <div v-if="open" class="list-ui--content mt-2">
        <slot></slot>
      </div>
    </expand-transition>
  </div>
</template>
<script>
/* eslint-disable no-unused-expressions */
import '~/assets/scss/components/_list.scss';
import ExpandTransition from '../Transitions/ExpandTransition.vue';

export default {
  name: 'ListGroupUi',
  components: { ExpandTransition },
  props: {
    prefixIcon: String,
    value: [String, Number, Boolean],
  },
  data() {
    return {
      open: !!this.value,
    };
  },
};
</script>
<style scoped lang="scss">
.list-ui-group {
  .activator {
    transition-duration: 200ms;
    transition-timing-function: ease;
    transition-property: color, padding;
    overflow: hidden;
  }
}

.list-ui--content {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
