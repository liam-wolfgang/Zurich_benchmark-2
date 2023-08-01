import { useContext } from 'react';
import styled from 'styled-components';

import { AppCtx } from '../utils';
import { Heading } from '../components/Headings';
import { Slider } from '../components/Slider';
import { Button } from '../components/Buttons';
import { Section } from '../components/Layout';
import { Mount } from '../components/Transitions';

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  > * {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 1200px) {
    margin: 10vh 0 0 12%;
  }

  @media screen and (min-width: 1440px) {
    margin: 26vh 0 0 20%;
  }
`;

const Flex = styled.div`
  margin-top: 16px;
  > span {
    font-size: 0.9em;
    font-weight: 500;
  }
  > div {
    display: flex;
    align-items: center;
    > span {
      font-size: 1.1em;
      font-weight: 500;
      width: 24px;
      text-align: right;
      position: relative;
      top: -2px;
    }
  }
`;

export const Children = () => {
  const { state, dispatch } = useContext(AppCtx);

  const handleChange = (key, value) => {
    dispatch({ key, value });
  };

  const isValid = state.numPrimary > 0 || state.numSecondary > 0 || state.numCollege > 0;

  return (
    <Mount show={state.page === 'children'}>
      <Section image="01Lead-min.png">
        <Wrapper>
          <Heading>Q1.</Heading>
          <Flex>
            <span>How many children do you have in Primary School?</span>
            <div>
              <Slider type="range"
                max={10}
                value={state.numPrimary}
                onInput={e => handleChange('numPrimary', e.target.value)}
                style={{
                  width: '100%',
                  '--min': 0,
                  '--max': 10,
                  '--val': state.numPrimary
                }} />
              <span>{state.numPrimary}</span>
            </div>
          </Flex>
          <Flex>
            <span>How many children do you have in Secondary School?</span>
            <div>
              <Slider type="range"
                max={10}
                value={state.numSecondary}
                onInput={e => handleChange('numSecondary', e.target.value)}
                style={{
                  width: '100%',
                  '--min': 0,
                  '--max': 10,
                  '--val': state.numSecondary
                }} />
              <span>{state.numSecondary}</span>
            </div>
          </Flex>
          <Flex>
            <span>How many children do you have in College?</span>
            <div>
              <Slider type="range"
                max={10}
                value={state.numCollege}
                onInput={e => handleChange('numCollege', e.target.value)}
                style={{
                  width: '100%',
                  '--min': 0,
                  '--max': 10,
                  '--val': state.numCollege
                }} />
              <span>{state.numCollege}</span>
            </div>
          </Flex>
          <Button disabled={!isValid} onClick={() => dispatch({ key: 'page', value: 'quiz' })}>Next</Button>
        </Wrapper>
      </Section>
    </Mount>
  );
};