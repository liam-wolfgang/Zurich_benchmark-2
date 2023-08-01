import styled from 'styled-components';

export const Heading = styled.h2`
  font-weight: 400;
  margin: ${({ margin }) => margin || '0'};
  font-size: ${({ size }) => size || '1.75em'};
  font-family: ${({ font }) => font || 'Ogg-Regular'};
  line-height: 1;
`;