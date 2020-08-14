import {
  popperGenerator,
  defaultModifiers,
} from '@popperjs/core/lib/popper-lite';
import flip from '@popperjs/core/lib/modifiers/flip';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import offset from '@popperjs/core/lib/modifiers/offset';

const createPopper = popperGenerator({
  defaultModifiers: [...defaultModifiers, flip, preventOverflow, offset],
});

export default function ({ content, target, placement = 'bottom' }) {
  return createPopper(target, content, {
    placement,
    modifiers: [
      offset,
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: () => {
            if (placement.startsWith('bottom') || placement.startsWith('top')) return [10, 0];

            return [0, 10];
          },
        },
      },
    ],
  });
}
