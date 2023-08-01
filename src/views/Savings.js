import { useContext } from 'react';
import styled from 'styled-components';
import { useTrail } from 'react-spring';

import { AppCtx } from '../utils';
import { AnimatedDiv } from './Quiz';
import { Heading } from '../components/Headings';
import { Button } from '../components/Buttons';
import { Section } from '../components/Layout';
import { Checkbox, Label } from '../components/Checkbox';
import { Mount } from '../components/Transitions';

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;

  ${Button} {
    margin-top: 12px;
  }
  ${Label} {
    margin-right: 12px;
    min-width: 150px;
    
    span {
      line-height: 0.9em;
    }

    &:hover {
      border-color: ${({ theme }) => theme.darkBlue};
    }
  }
  @media screen and (min-width: 1200px) {
    margin: 0 0 0 12%;
  }

  @media screen and (min-width: 1440px) {
    margin: 20vh 0 0 33%;
  }
`;

const Flex = styled.div`
  display: flex;
  height: 42px;
  margin-bottom: 2em;
`;

const savingsOptions = [
  "Less than €500",
  "€501 - €1,000",
  "€1,001 - €2,000",
  "€2,001 - €5,000",
  "€5,001 - €10,000",
  "€10,001 - €20,000",
  "€20,000 +"
];

export const Savings = () => {
  const { state, dispatch } = useContext(AppCtx);

  const itemHeight = window.matchMedia('(min-width: 1440px)').matches ? 50 : 38;
  const trail = useTrail(savingsOptions.length, {
    config: { duration: 100 },
    opacity: state.page === 'savings-amount' ? 1 : 0,
    height: state.page === 'savings-amount' ? itemHeight : 0,
    enter: { opacity: 0, height: itemHeight },
    exit: { opacity: 0, height: 0 }
  });

  const toggle = value => {
    dispatch({ key: 'hasSavingsAccount', value });
    dispatch({ key: 'savingsOptionSelected', value: true });
  };

  return (
    <>
      <Mount show={state.page === 'savings'}>
        <Section image="06Savings-min.png">
          <Wrapper checked={state.hasSavingsAccount}>
            <Heading>Q{state.totalQuestions + 2}.</Heading>
            <p>Do you have a savings account?</p>
            <Flex>
              <Checkbox
                id={`Q${state.totalQuestions + 2}`}
                label="Yes, I do"
                checked={state.hasSavingsAccount}
                onChange={() => toggle(true)}
                colour="darkBlue"
              />
              <Checkbox
                id={`Q${state.totalQuestions + 2}`}
                label="No, I don't"
                checked={state.savingsOptionSelected && !state.hasSavingsAccount}
                onChange={() => toggle(false)}
                colour="darkBlue"
              />
            </Flex>
            <Button
              onClick={() => dispatch({ key: 'page', value: state.hasSavingsAccount ? 'savings-amount' : 'email' })}
              disabled={!state.savingsOptionSelected}
            >
              Next
            </Button>
          </Wrapper>
        </Section>
      </Mount>
      <Mount show={state.page === 'savings-amount'}>
        <Section image="06Savings-min.png">
          <Wrapper checked={state.hasSavingsAccount}>
            <Heading>Q{state.totalQuestions + 3}.</Heading>
            <p>Roughly how much have you managed to save in your savings account(s) to date?</p>
            {trail.map((style, i) => (
              <AnimatedDiv key={i} style={style}>
                <Checkbox
                  id={`Q${state.totalQuestions + 3}`}
                  key={i}
                  label={savingsOptions[i]}
                  checked={state.amountSaved === savingsOptions[i]}
                  onChange={() => dispatch({ key: 'amountSaved', value: savingsOptions[i] })}
                  colour="darkBlue"
                />
              </AnimatedDiv>
            ))}
            <Button disabled={state.amountSaved === ''} onClick={() => dispatch({ key: 'page', value: 'email' })}>Next</Button>
          </Wrapper>
        </Section>
      </Mount>
    </>
  );
};