<script>
import '~/assets/scss/components/_circular-progress.scss';

export default {
  name: 'CircularProgressUi',
  props: {
    strokeWidth: {
      type: [String, Number],
      default: '5',
    },
    size: {
      type: Number,
      default: 60,
    },
    color: {
      type: String,
      default: 'var(--primary)',
    },
    value: {
      type: Number,
      default: 0,
    },
    rotate: {
      type: [Number, String],
      default: 0,
    },
    spinner: Boolean,
  },
  data: () => ({
    radius: 20,
  }),
  computed: {
    normalizeValue() {
      if (this.value < 0) return 0;
      if (this.value > 100) return 100;

      return parseFloat(this.value);
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },
    strokeDashOffset() {
      return `${((100 - this.normalizeValue) / 100) * this.circumference}px`;
    },
    strokeWidthComp() {
      return (+this.strokeWidth / this.size) * this.viewBox * 2;
    },
    viewBox() {
      return this.radius / (1 - +this.strokeWidth / this.size);
    },
  },
  methods: {
    generateSvg(h) {
      const generateCircle = (name, offset, classes) => h('circle', {
        staticClass: classes,
        attrs: {
          cx: 2 * this.viewBox,
          cy: 2 * this.viewBox,
          r: this.radius,
          'stroke-width': this.strokeWidthComp,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset,
          stroke: name === 'main' ? this.color : 'var(--bg-input)',
        },
      });

      return h(
        'svg',
        {
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: `${this.viewBox} ${this.viewBox} ${2 * this.viewBox} ${2
              * this.viewBox}`,
          },
          style: {
            transform: `rotate(${this.rotate}deg)`,
          },
        },
        [
          generateCircle('main', this.strokeDashOffset, 'path'),
          generateCircle('secondary', 0),
        ],
      );
    },
  },
  render(h) {
    return h(
      'div',
      {
        staticClass: 'circular-progress-ui',
        class: {
          spinner: this.spinner,
        },
        style: {
          height: `${this.size}px`,
          width: `${this.size}px`,
        },
      },
      [
        this.generateSvg(h),
        h(
          'div',
          {
            staticClass: 'circular-progress-ui__content',
          },
          this.$slots.default,
        ),
      ],
    );
  },
};
</script>
