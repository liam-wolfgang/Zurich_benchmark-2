import styled from 'styled-components';
import { Transition, config, animated } from 'react-spring';

const Wrapper = styled(animated.div)`
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || 0};
  padding-bottom: 8px;
  height: 100%;
`;

export const Mount = ({ 
  show, 
  children, 
  width = 'calc(100% - 16px)',
  leave = { opacity: 0 }, 
  from = { opacity: 0, position: 'absolute' },
  ...rest
}) => {
  return (
    <Transition
      items={show}
      from={from}
      enter={{ opacity: 1 }}
      leave={leave}
      reverse={show}
      delay={120}
      config={config.subtle}
    >
      {(styles, item) =>
        item && <Wrapper width={width} style={styles} {...rest}>{children}</Wrapper>
      }
    </Transition>
  );
};