<template>
  <transition name="scale">
    <slot></slot>
  </transition>
</template>
<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.6);
  opacity: 0;
}
</style>
