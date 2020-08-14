export default function ({
  target,
  keyframes,
  options,
  root = document,
}) {
  const targetElement = root.querySelector(target);

  if (!targetElement) {
    console.error('Element not found');
    return null;
  }

  const animation = targetElement.animate(keyframes, {
    ...options,
    iterations: options.iterations || Infinity,
  });

  const stopPlaying = () => {
    animation.pause();
    animation.currentTime = 0;
  };
  animation.restart = () => {
    if (animation.currentTime > 0) animation.currentTime = 0;
  };
  animation.stop = stopPlaying;
  animation.pause();

  return animation;
}
