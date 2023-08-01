import { useContext } from 'react';
import styled from 'styled-components';

import { AppCtx } from '../utils';
import { Mount } from '../components/Transitions';
import { Section } from '../components/Layout';
import { Heading } from '../components/Headings';
import { Button } from '../components/Buttons';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 42px;
  
  ${Button} {
    margin-top: 16px;
    margin-bottom: 72px;
    max-width: 130px;
  }

  @media screen and (max-width: 420px) {
    ${Heading}:first-child {
      font-size: 2.5em;
    }
    ${Heading}:nth-child(2) {
      font-size: 2.25em;
    }
  }

  @media screen and (min-width:768px) {
    margin-top: 10vh;
    margin: 33% 0 72px 12%;
  }

  @media screen and (min-width:1200px) {
    margin: 30vh 0 0 12%;
  }

  @media screen and (min-width:1440px) {
    margin: 36vh 0 0 24%;
  }
`;

export const Home = () => {
  const { state, dispatch } = useContext(AppCtx);

  return (
    <Mount show={state.page === 'home'}>
      <Section image="01Lead-min.png">
        <Wrapper>
          <div>
            <Heading as="h1" size="3em">Cost of Education</Heading>
            <Heading font="Zurich Sans" size="2.75em">Benchmarking Tool</Heading>
            <Button onClick={() => dispatch({ key: 'page', value: 'children' })}>Let's begin</Button>
          </div>
        </Wrapper>
      </Section>
    </Mount>
  );
};