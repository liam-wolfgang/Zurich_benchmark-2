import styled, { keyframes } from 'styled-components';

import { Heading } from './Headings';

const fade = keyframes`
  from: { opacity: 0; } 
  to: { opcity: 1 }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const Wrapper = styled.main`
  padding: 8px;
  position: relative;
  min-height: calc(100vh - 100px);
`;

const Logo = styled.img.attrs({ src: './static/images/zurich_logo.png' })`
  width: 150px;
`;

const MobileTitle = styled(Heading)`
  text-align: center;
  margin-bottom: 1em;
  font-family: 'Ogg-Regular';

  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const DesktopTitle = styled(Heading)`
  white-space: nowrap;
  max-width: 610px;
  margin-left: auto;
  text-align: center;
  position: relative;
  top: 200px;
  font-size: 2.5em;
  font-family: 'Ogg-Regular';

  @media only screen and (max-width: 1199px) {
    display: none;
  }

  @media only screen and (max-width: 1439px) {
    top: 80px;
    max-width: 460px;
    font-size: 2em;
  }
`;

export const Layout = ({ children }) => (
  <>
    <Header>
      <Logo />
    </Header>
    <Wrapper>
      {children}
    </Wrapper>
  </>
);

const SectionWrapper = styled.section`
  max-width: ${({ width }) => width || '1024px'};
  transition: all 200ms ease-out;
`;

const Image = styled.img`
  max-width: 100%;
  animation: ${fade} 300ms forwards;

  @media screen and (min-width: 768px) {
    max-width: 90%;
  }
  
  @media screen and (min-width: 1200px) {
    max-width: 540px;
    position: absolute;
    right: 0;
    bottom: ${({ bottom }) => bottom};
  }

  @media screen and (min-width: 1440px) {
    max-width: 720px;
  }
`;

export const Section = ({ children, image, title, bottom = 0 }) => (
  <>
    {title && <DesktopTitle>{title}</DesktopTitle>}
    <SectionWrapper>
      {title && <MobileTitle>{title}</MobileTitle>}
      {children}
    </SectionWrapper>
    {image && <Image key={image} src={`./static/images/${image}`} alt={title || 'Title'} bottom={bottom} />}
  </>
);