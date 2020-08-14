<template>
  <popover-ui
    :placement="placement"
    :disabled="disabled"
    @show="open = true"
    @hide="open = false"
  >
    <div class="select-ui" :class="{ block, disabled }">
      <div class="select-ui--inner">
        <v-mdi v-if="prefixIcon" :name="prefixIcon" class="mr-2"></v-mdi>
        <slot name="selected" :value="value">
          <p class="text-overflow text">{{ value }}</p>
        </slot>
        <v-mdi :rotate="open ? 180 : 0" name="mdi-chevron-down"></v-mdi>
      </div>
    </div>
    <template v-slot:popover>
      <card-ui class="shadow-xl border select-ui--content">
        <p v-if="!!title" class="font-semibold mb-3">{{ title }}</p>
        <list-ui
          v-for="item in list"
          :key="item"
          v-close-popover
          dense
          class="cursor-pointer"
          @click="emitEvent(item)"
        >
          <slot name="option" :value="item">{{ item }}</slot>
        </list-ui>
      </card-ui>
    </template>
  </popover-ui>
</template>
<script>
import '~/assets/scss/components/_select.scss';

export default {
  name: 'SelectUi',
  props: {
    placement: {
      type: String,
      default: 'bottom',
    },
    value: [String, Number],
    list: Array,
    block: Boolean,
    title: String,
    prefixIcon: String,
    disabled: Boolean,
  },
  data: () => ({
    open: false,
  }),
  methods: {
    emitEvent(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
};
</script>
