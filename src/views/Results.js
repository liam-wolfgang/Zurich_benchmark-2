import { useState } from 'react';
import styled from 'styled-components';

import tabInfo from '../data/resultsTabInfo.json';
import { useResults } from '../hooks';
import { Mount } from '../components/Transitions';
import { Heading } from '../components/Headings';
import { TabList, Tab, TabContent } from '../components/Tabs';
import { ResultsTab } from '../components/ResultsTab';

const tabColours = ['mint', 'teal', 'midBlue', 'peach', 'white'];

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  
  ${Heading} {
    text-align: center;
  }

  ${TabContent} {
    padding: 0;
    border-bottom: 0 !important;
  }
`;

const Icon = styled.img`
  position: absolute;
  width: 50px;
  left: calc(50% - 25px);
  transform: translateY(12px);

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Cta = styled.a.attrs({ target: '_blank', rel: 'noopener noreferrer' })`
  color: white;
  text-decoration: none;
  border: 1px solid white;
  padding: 16px;
  border-radius: 8px;
  transition: all 200ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.zurichBlue};
    background: ${({ theme }) => theme.zurichBlue};;
  }
`;

const Footer = styled.div`
  background: ${({ theme }) => theme.darkBlue};
  border-top: 4px solid ${({ theme }) => theme.midBlue};
  display: flex;
  justify-content: center;
  padding: 16px;
  min-height: 88px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  text-align: center;
`;

const LegalText = styled.p`
  font-style: italic;
  font-size: 0.8em;
  color: white;
  text-align: center;
  margin: 1.5em 0;
`;

export const Results = () => {
  const { tabs, state, results } = useResults();

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Mount show={state.page === 'results'}>
      <Wrapper>
        <Heading margin="0 0 32px 0" size="2.5em">Your results</Heading>
        <TabList activeIndex={tabIndex}>
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              colour="darkBlue"
              background={tabColours[i % tabColours.length]}
              altBackground={tabColours[tabIndex]}
              onClick={() => setTabIndex(i)}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, i) => (
          <TabContent key={i} isActive={tabIndex === i} border="transparent">
            <Icon src={`./static/images/${tabInfo[tab].icon}`} alt={tab} aria-hidden />
            <ResultsTab
              results={results[tab]}
              colour={tabColours[i % tabColours.length]}
            />
          </TabContent>
        ))}
        <Footer>
          {tabInfo[tabs[tabIndex]].ctaText && (
            <Cta href={tabInfo[tabs[tabIndex]].ctaLink}>
              {tabInfo[tabs[tabIndex]].ctaText}
            </Cta>
          )}
        </Footer>
      </Wrapper>
      <LegalText>*Source: Zurich Cost of Education Survey 2023</LegalText>
    </Mount>
  );
};