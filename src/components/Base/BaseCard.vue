<template>
  <div
    class="card-ui relative"
    :class="{
      'hover:shadow-xl is-hover': hover,
      border: outline,
      small: small,
      large: large,
      disabled: disabled
    }"
    :style="{
      height: height,
      width: width
    }"
    @click="$emit('click', $event)"
  >
    <div
      v-if="$slots.image"
      class="card-ui__image"
      @click="$emit('click-image', $event)"
    >
      <slot name="image"></slot>
    </div>
    <div v-if="$slots.header" class="card-ui__header flex items-center">
      <slot name="header"></slot>
    </div>
    <div
      class="card-ui__content"
      :class="{ 'no-padding': noPaddingContent }"
      @click="$emit('click-content', $event)"
    >
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-ui__footer flex items-center">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import '~/assets/scss/components/_card.scss';

export default {
  name: 'CardUi',
  props: {
    outline: Boolean,
    hover: Boolean,
    small: Boolean,
    disabled: Boolean,
    large: Boolean,
    noPaddingContent: Boolean,
    height: [String, Number],
    width: [String, Number],
  },
};
</script>
