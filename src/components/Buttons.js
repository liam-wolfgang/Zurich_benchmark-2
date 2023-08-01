import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1rem;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: 1rem;
  background: white;
  color: ${({ theme, colour }) => theme[colour] || theme.zurichBlue};
  font-family: inherit;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 200ms ease-out;
  margin: ${({ margin }) => margin || 0};
  outline: 0;
  min-width: 100px;
  opacity: 1;
  
  &:hover {
    border-color: ${({ borderless }) => borderless ? 'transparent' : 'white'};
    background: ${({ theme, colour }) => theme[colour] || theme.zurichBlue};
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0;
  }
`;