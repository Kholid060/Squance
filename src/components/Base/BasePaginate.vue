<template>
  <div class="pagination flex justify-end items-center">
    <template v-if="!hideSelect">
      <span class="mr-2 hidden md:block">Rows per page: </span>
      <select-ui
        :value="perPage"
        :list="perPageList"
        @input="$emit('update:perPage', $event)"
      ></select-ui>
    </template>
    <div v-else>
      <p>Page {{ value + 1 }} of {{ pageCount }}</p>
    </div>
    <div class="ml-8">
      <button-ui icon :disabled="value <= 0" @click="$emit('input', value - 1)">
        <v-mdi name="mdi-chevron-down" :rotate="90"></v-mdi>
      </button-ui>
      <button-ui
        icon
        class="ml-2"
        :disabled="value >= pageCount - 1"
        @click="$emit('input', value + 1)"
      >
        <v-mdi name="mdi-chevron-down" :rotate="270"></v-mdi>
      </button-ui>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaginateUi',
  props: {
    hideSelect: Boolean,
    perPageList: {
      type: Array,
      default: () => [5, 10, 25, 100],
    },
    perPage: {
      type: Number,
      default: 10,
    },
    value: Number,
    pageCount: Number,
  },
  watch: {
    pageCount(newVal) {
      if (newVal > this.value) {
        this.$emit('input', 0);
      }
    },
  },
};
</script>
