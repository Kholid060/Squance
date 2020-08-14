<template>
  <span :style="elementSize" class="skeleton-box-ui rounded-lg" />
</template>
<script>
const types = {
  text: {
    height: '16px',
    width: '130px',
  },
};

export default {
  name: 'SkeletonBoxUi',
  props: {
    height: {
      type: String,
      default: '40px',
    },
    width: {
      type: String,
      default: '60px',
    },
    type: {
      type: String,
      default: 'custom',
      validator(value) {
        return [...Object.keys(types), 'custom'].includes(value);
      },
    },
  },
  computed: {
    elementSize() {
      return this.type === 'custom'
        ? { height: this.height, width: this.width }
        : types[this.type];
    },
  },
};
</script>

<style lang="scss" scoped>
.light-theme {
  .skeleton-box-ui {
    @apply bg-input;
    &::after {
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.3) 20%,
        rgba(#fff, 0.6) 60%,
        rgba(#fff, 0)
      );
    }
  }
}

.dark-theme {
  .skeleton-box-ui {
    @apply bg-lighter;
    &::after {
      background-image: linear-gradient(
        90deg,
        rgba(#000, 0) 0,
        rgba(#000, 0.15) 20%,
        rgba(#000, 0.25) 60%,
        rgba(#000, 0)
      );
    }
  }
}

.skeleton-box-ui {
  vertical-align: middle;
  display: inline-block;
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    animation: shimmer 3s infinite;
    content: '';
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
