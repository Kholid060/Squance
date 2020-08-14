<template>
  <div class="modal">
    <div class="activator" @click="show = true" v-if="$slots.activator">
      <slot name="activator"></slot>
    </div>
    <teleport to="#modal-container">
      <div
        class="modal-ui fixed h-full w-full top-0 left-0 flex z-30 justify-center items-center"
        v-if="show"
        ref="modal"
      >
        <div class="modal-content relative z-10 invisible opacity-0">
          <slot></slot>
        </div>
        <div
          @click="closeModal"
          :style="{ 'backdrop-filter': props.blur ? 'blur(2px)' : null }"
          class="bg-black absolute opacity-0 h-full w-full bg-opacity-25 overlay invisible"
        ></div>
      </div>
    </teleport>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import '~/assets/scss/components/_modal.scss';

export default {
  name: 'ModalUi',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 200,
    },
    blur: Boolean,
  },
  setup(props, { emit }) {
    const modal = ref(null);
    const show = ref(props.modelValue);
    const keyup = ({ key }) => {
      if (key === 'Escape') show.value = false;
    };

    watch(() => props.modelValue, (value) => {
      show.value = value;
    });
    watch(show, (value) => {
      if (value) {
        document.addEventListener('keyup', keyup);
        setTimeout(() => {
          modal.value.classList.add('show');
        }, props.delay);
      } else {
        emit('update:modelValue', false);

        document.removeEventListener('keyup', keyup);
      }
    }, { deep: true });

    return {
      show,
      props,
      modal,
      closeModal: () => {
        modal.value.classList.remove('show');
        setTimeout(() => {
          show.value = false;
        }, 250);
      },
    };
  },
};
</script>
