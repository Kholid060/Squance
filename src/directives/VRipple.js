import '~/assets/scss/components/_ripple.scss';
/* eslint-disable */
export default {
  mounted(el) {
    if (el.classList.contains('v-ripple__container')) return;
    console.log(el.classList.contains('v-ripple__container'));
    el.classList.add('v-ripple__container');

    el.addEventListener('click', (event) => {
      const ripple = document.createElement('div');
      el.appendChild(ripple);

      const d = Math.max(el.clientWidth, el.clientHeight);
      ripple.style.width = ripple.style.height = d + 'px';

      ripple.style.left = event.offsetX + 'px';
      ripple.style.top = event.offsetY + 'px';

      console.log(d, ripple.style.top, ripple.style.left, event);

      ripple.classList.add('v-ripple');

      setTimeout(() => {
        el.removeChild(ripple);
      }, 1000);
    });
  }
}
