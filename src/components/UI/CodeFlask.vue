<template>
  <div
    id="codeflask"
    class="h-64 overflow-auto scroll"
    :style="{ height, width }"
  ></div>
</template>
<script>
import {
  onMounted,
  ref,
  watch,
  toRef,
} from 'vue';
import CodeFlask from 'codeflask';

export default {
  props: {
    height: [String, Number],
    width: [String, Number],
    code: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'text/css',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const editor = ref(null);

    watch(toRef(props, 'code'), (value) => {
      editor.value.updateCode(value);
    });

    onMounted(() => {
      editor.value = new CodeFlask('#codeflask', {
        language: props.language,
        readonly: props.readonly,
      });
      editor.value.updateCode(props.code);
      editor.value.onUpdate((value) => {
        emit('update:code', value);
        emit('change', value);
      });
      editor.value.elTextarea.placeholder = 'Your code here';
    });
  },
};
</script>
<style lang="scss">
.codeflask {
  @apply rounded bg-input #{!important};
  position: relative !important;
  &__pre, &__code, &__textarea {
    font-family: 'Fira Code', monospace !important;
  }
}
</style>
