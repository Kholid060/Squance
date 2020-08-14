import createPopper from '~/utils/popper';

export default {
  beforeMount(el, binding) {
    const id = `tooltip-ui__${Math.random().toString(36).substr(2, 8)}`;

    el.setAttribute('data-tooltipText', binding.value);

    if (el.dataset.tooltipid) return;

    el.setAttribute('data-tooltipId', id);
    el.addEventListener('mouseenter', () => {
      const createELement = (tag, classes) => {
        const element = document.createElement(tag);
        element.classList = classes;

        return element;
      };

      if (document.getElementById(id)) return;

      const tooltipContainer = createELement('div', 'tooltip-ui hide');
      tooltipContainer.id = el.dataset.tooltipid || id;

      const content = createELement('div', 'content');
      content.innerText = el.dataset.tooltiptext || binding.value;
      tooltipContainer.appendChild(content);

      createPopper({
        target: el,
        content: tooltipContainer,
        placement: binding.arg || 'bottom',
      });

      document.body.appendChild(tooltipContainer);

      setTimeout(() => {
        tooltipContainer.classList.replace('hide', 'show');
      }, 200);
    });
    el.addEventListener('mouseleave', () => {
      document.body.removeChild(document.getElementById(el.dataset.tooltipid || id));
    });
  },
  updated(el, binding) {
    el.setAttribute('data-tooltipText', binding.value);
  },
  beforeUnmount(el) {
    const tooltip = document.getElementById(el.dataset.tooltipid);

    if (tooltip) document.body.removeChild(tooltip);
  },
};
