import styled, { css } from 'styled-components';

export const Tab = styled.button`
  background: ${({ theme, background }) => theme[background] || background};
  color: ${({ theme, colour }) => theme[colour] || colour};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;
  border: 0;
  outline: 0;
  font-family: inherit;
  cursor: pointer;
  font-size: 1rem;
  flex-grow: 1;
  height: 50px;
  transition: all 125ms ease-out;
  font-weight: 600; 
  padding: 0;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: ${({ theme, altBackground }) => theme[altBackground] || altBackground};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    height: 8px;
    z-index: -1;
    background: ${({ theme, altBackground }) => theme[altBackground] || altBackground};
    transition: all 100ms ease-out;
  }

  @media screen and (max-width: 420px) {
    font-weight: 400;
    font-size: 0.9em;
  }
`;

// Max 5 tabs 
export const TabList = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    ${({ activeIndex }) => css`
      ${Tab}:first-of-type {
        border-bottom-right-radius: ${activeIndex === 1 ? '16px' : 0};
      }

      ${Tab}:nth-of-type(2) {
        border-bottom-right-radius: ${activeIndex === 2 ? '16px' : 0};
        border-bottom-left-radius: ${activeIndex === 0 ? '16px' : 0};
      }

      ${Tab}:nth-of-type(3) {
        border-bottom-right-radius: ${activeIndex === 3 ? '16px' : 0};
        border-bottom-left-radius: ${activeIndex === 1 ? '16px' : 0};
      }

      ${Tab}:nth-of-type(4) {
        border-bottom-right-radius: ${activeIndex === 4 ? '16px' : 0};
        border-bottom-left-radius: ${activeIndex === 2 ? '16px' : 0};
      }

      ${Tab}:nth-of-type(5) {
        border-bottom-right-radius: ${activeIndex === 5 ? '16px' : 0};
        border-bottom-left-radius: ${activeIndex === 3 ? '16px' : 0};
      }
    `}
  }
`;

export const TabContent = styled.div`
  background: ${({ theme, background }) => theme[background] || background};
  color: ${({ theme, colour }) => theme[colour] || colour};
  border-bottom: 16px solid ${({ theme, border }) => theme[border] || border};
  display: ${({ isActive }) => isActive ? 'block' : 'none'};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  @media only screen and (min-width:1024px) {
    padding: 16px;
  }
`;