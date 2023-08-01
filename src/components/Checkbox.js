import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
`;

const Icon = styled.svg`
  fill: white;
  stroke: none;
  width: 24px;
  height: 24px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: inherit;
  transition: all 150ms;
  position: relative;
  top: 2px;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const Label = styled.label`
  cursor: pointer;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 10px;
  border: 1px solid white;
  background-color: ${({ checked, theme, colour }) => checked ? (theme[colour] || colour) || theme.zurichBlue : 'inherit'};
  border-color: ${({ checked }) => checked ? 'transparent !important' : 'inherit'};
  color: ${({ checked }) => checked ? 'white' : 'inherit'};
  border-radius: 4px;
  padding: 0 0.25em 0 1em;
  transition: border-color 200ms ease-out;
  height: 100%;
  line-height: 1;
  font-size: 1.1em;
  > span {
    font-size: 0.9em;
  }
  &:hover {
    border-color: ${({ theme }) => theme.zurichBlue};
  }
`;

export const Checkbox = ({ id, label, checked, colour, ...props }) => (
  <Label checked={checked} colour={colour}>
    <span>{label}</span>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <path d="M21.855 10.303c.086.554.145 1.118.145 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.348 0 4.518.741 6.304 1.993l-1.421 1.457c-1.408-.913-3.083-1.45-4.883-1.45-4.963 0-9 4.038-9 9s4.037 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.865-1.902zm-.951-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  </Label>
);

const BasicCheckboxContainer = styled(CheckboxContainer)`
  display: flex;
`;

const BasicStyledCheckbox = styled(StyledCheckbox)`
  top: 0;
  margin: auto;
  border-radius: 2px;
  background: white;
`;

const TickIcon = styled(Icon)`
  fill: none;
  stroke: ${({ theme }) => theme.darkBlue};
  stroke-width: 2px;
`;

export const BasicCheckbox = ({ checked, ...props }) => (
  <BasicCheckboxContainer>
    <HiddenCheckbox checked={checked} {...props} />
    <BasicStyledCheckbox checked={checked}>
      <TickIcon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </TickIcon>
    </BasicStyledCheckbox>
  </BasicCheckboxContainer>
);