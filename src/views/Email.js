import { useContext, useState } from 'react';
import styled from 'styled-components';

import { AppCtx, isValidEmail } from '../utils';
import { BasicCheckbox } from '../components/Checkbox';
import { Button } from '../components/Buttons';
import { Loader } from '../components/Loader';
import { Section } from '../components/Layout';
import { Input } from '../components/Input';
import { Mount } from '../components/Transitions';

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.darkBlue};
  border-radius: 16px;
  padding: 16px;
  height: 400px;
  margin-bottom: 8px;
  max-width: 500px;

  ${Button} {
    margin-top: 32px;
  }
  @media only screen and (min-width: 1440px) {
    margin: 10vh auto 0 auto;
  }
`;

const LegalText = styled.p`
  font-size: 0.66em;
  margin-top: 16px;

  a {
    color: white;
  }
`;

const CheckboxLabel = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 12px;
  cursor: pointer;
  margin-top: 16px;
`;

export const Email = () => {
  const { state, dispatch } = useContext(AppCtx);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target }) => {
    dispatch({ key: 'email', value: target.value });
  };

  const isValid = isValidEmail(state.email) && !!state.readPolicy;

  const handleSubmit = async () => {
    if (isValid && !isLoading) {
      setIsLoading(true);
      await fetch('https://n07hx5qwhe.execute-api.eu-west-1.amazonaws.com/prod/zurich-lead-capture', {
        method: 'POST',
        body: JSON.stringify({
          email: state.email,
          optIn: state.optIn
        })
      });
      setIsLoading(false);
      dispatch({ key: 'page', value: 'results' })
    }
  }

  return (
    <Mount show={state.page === 'email'}>
      <Section image="07Results-min.png">
        <Wrapper checked={state.hasSavingsAccount}>
          <p>Please enter your email address to view your results:</p>
          <Input name="email" type="email" value={state.email} onChange={handleChange} />
          <CheckboxLabel>
            <BasicCheckbox
              checked={state.optIn}
              onChange={() => dispatch({ key: 'optIn', value: !state.optIn })}
            />
            <LegalText>
              Would you like to opt in to recieve offers, news, updates and access to exclusive reports from Zurich? By opting in you are providing consent to receive email communications from Zurich Life and other Zurich Group Companies.
            </LegalText>
          </CheckboxLabel>
          <CheckboxLabel>
            <BasicCheckbox
              checked={state.readPolicy}
              onChange={() => dispatch({ key: 'readPolicy', value: !state.readPolicy })}
            />
            <LegalText>
              I confirm that I have read and understood Zurich’s <a href="https://www.zurich.ie/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy.</a>
            </LegalText>
          </CheckboxLabel>
          {isLoading ? (
            <Loader />
          ) : (
            <Button disabled={!isValid || isLoading} onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <LegalText>
            This tool doesn’t constitute advice and does not form part of any contract with Zurich. It is for illustrative purposes only and is based on the Cost of Education Survey 2023.
          </LegalText>
        </Wrapper>
      </Section>
    </Mount>
  );
};