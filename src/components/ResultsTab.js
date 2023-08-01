import styled from 'styled-components';

import { Heading } from './Headings';
import { BarChart } from './Charts';

const backgrounds = ['lightBlue', 'darkBlue', 'darkGreen'];
const colours = ['darkBlue', 'lightBlue', 'darkBlue'];

const Section = styled.div`
  padding-top: 8px;
  flex-grow: 1;
  flex-wrap: wrap;
  min-width: 50%;
  background: ${({ theme, index }) => theme[backgrounds[index % backgrounds.length]]};
  color: ${({ theme, index }) => theme[colours[index % colours.length]]};
`;

const ChartWrapper = styled.div`
  height: 200px;
  max-width: 900px;
  margin: 0 auto;

  @media screen and (min-width:1440px) {
    height: 300px;
  }
`;

const Tooltip = styled.div`
  background: ${({ theme, colour }) => theme[colour]};
  color: ${({ theme }) => theme.darkBlue};
  border-radius: 16px;
  font-size: 0.8em;
  padding: 1em;
  max-width: 90%;
  margin: 0 auto 16px auto;

  p {
    margin: 0
  }

  > p:nth-child(2) {
    margin-top: 8px;
  }

  @media screen and (min-width: 768px) {
    font-size: 0.9em;
  }
`;

const Wrapper = styled.div`
  ${Heading} {
    margin: 16px 0;
    font-family: 'Zurich Sans';
    font-weight: 600;
  }    
  > ${Section}:first-child {
    margin-top: 8px;
  }

  @media only screen and (min-width:768px) {
    display: flex;
    > ${Section}:nth-child(2) {
      margin-top: 8px;
    }
  }
`;

const getMargin = (i, length) => {
  return i % (length - 1) === 0 || i !== length - 1 ? 'inherit' : '52px 0 16px 0 !important';
}

export const ResultsTab = ({ results, colour }) => {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  return (
    <Wrapper>
      {Object.entries(results.data).map(([key, value], i) => {
        const strs = results.text[key]?.split('<b>') || ['', ''];

        return (
          <Section key={key} index={i}>
            <Heading 
              as="h3" 
              size="1.2em" 
              margin={isMobile ? 'inherit' : getMargin(i, Object.keys(results.data).length)}
            >
              {key}
            </Heading>
            <Tooltip colour={colour}>
              <p>Average spend per child:
                <strong>
                  {' '}
                  {value.average?.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' }).replace(/\.00$/, '')}
                </strong>
              </p>
              <p>{strs[0]}<strong>{strs[1].toLowerCase()}.</strong></p>
            </Tooltip>
            <ChartWrapper>
              <BarChart 
                dataset={value.values} 
                background={backgrounds[i % backgrounds.length]}
                isMobile={isMobile} 
              />
            </ChartWrapper>
          </Section>
        );
      })}
    </Wrapper>
  );
};