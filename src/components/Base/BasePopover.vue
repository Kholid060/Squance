<template>
  <div class="popover inline-block">
    <div class="popover-activator" ref="target" @click="createPopover">
      <slot></slot>
    </div>
    <teleport to="#popover-container" v-bind="{ disabled }">
      <div class="popover-ui" :id="id">
        <div class="content" v-if="show && !disabled">
          <slot name="popover"></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import createPopper from '~/utils/popper';

export default {
  name: 'PopoverUi',
  props: {
    value: Boolean,
    disabled: Boolean,
    trigger: {
      type: String,
      default: 'click',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
  },
  setup(props) {
    const id = `popover-ui__${Math.random().toString(36).substr(2, 8)}`;
    const target = ref(null);
    const show = ref(false);
    const popper = ref(null);

    const createPopover = () => {
      if (props.disabled) return;

      const popover = document.getElementById(id);
      show.value = !show.value;

      popper.value = createPopper({
        target: target.value,
        content: popover,
        placement: props.placement,
      });
    };

    const onClickOutside = (event) => {
      const popoverContainer = document.getElementById('popover-container');

      if (!popoverContainer.contains(event.target)) {
        show.value = false;
        popper.value.destroy();
      }
    };

    watch(show, (newVal) => {
      const popover = document.getElementById(id);

      setTimeout(() => {
        popover.classList.toggle('show');
        /* eslint-disable-next-line */
        newVal
          ? document.addEventListener(props.trigger, onClickOutside)
          : document.removeEventListener(props.trigger, onClickOutside);
      }, 200);
    });

    return {
      id,
      show,
      target,
      createPopover,
    };
  },
};
</script>
