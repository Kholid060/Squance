import kebabcase from 'lodash.kebabcase';

export const isObject = (data) => typeof data === 'object' && data !== null;

export const parseKeyframe = (keyframes) => {
  const keyframesKeys = Object.keys(keyframes).map(Number).sort((a, b) => a - b);
  if (keyframesKeys.length === 0) return [];

  return keyframesKeys.map((key) => ({
    ...JSON.parse(JSON.stringify(keyframes[key])),
    offset: key / 100,
  }));
};

export const isHTMLElement = (data) => data instanceof HTMLElement;

/* Don't touch this */
export const formatCSS = ({
  properties,
  name,
  target,
  keyframes,
  css,
}) => {
  const propertiesValue = Object.keys(properties).map((key) => {
    const value = properties[key];

    if (value === Infinity) return 'Infinite';
    if (key === 'duration') return `${value}ms`;

    return value;
  }).join(' ');
  const animationProperties = `${name} ${propertiesValue}`;

  const animationKeyframes = Object.entries(keyframes).map(([key, value]) => {
    const keyframe = Object.entries(JSON.parse(JSON.stringify(value)));
    const cssKeyframe = keyframe.map(([keyframeKey, keyframeKeyValue]) => (
      `    ${kebabcase(keyframeKey)}: ${keyframeKeyValue};`
    )).join('\n');

    return `  ${key}% { \n${cssKeyframe}\n  };`;
  }).join('\n');

  return `${target} {
  animation: ${animationProperties};
}

@keyframes ${name} {
${animationKeyframes}
}

${css}`;
};
