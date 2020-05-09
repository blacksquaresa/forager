import React, { ReactNode, ReactElement } from 'react';

type ConditionalProps = {
  condition: (() => boolean) | boolean;
  children: ReactElement;
};
const Conditional: React.FC<ConditionalProps> = (props) => {
  if ((typeof props.condition === 'function' && props.condition()) || props.condition) {
    return props.children || null;
  }
  return null;
};

export default Conditional;
