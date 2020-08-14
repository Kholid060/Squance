<template>
  <div class="empty-state-ui">
    <div class="empty-state-ui--header">
      <div v-if="!!icon" class="icon">
        <v-mdi :name="icon" size="36"></v-mdi>
      </div>
      <slot v-else name="header"></slot>
    </div>
    <div class="empty-state-ui--content">
      <p class="title">{{ title }}</p>
      <p class="description text-lighter">{{ description }}</p>
    </div>
    <div v-if="$slots.action" class="empty-state-ui--action">
      <slot name="action"></slot>
    </div>
  </div>
</template>
<script>
import '~/assets/scss/components/_empty-state.scss';

export default {
  name: 'EmptyStateUi',
  props: {
    icon: String,
    title: String,
    description: String,
  },
};
</script>
