import { useState } from 'react';
import styled from 'styled-components';
import { useTrail } from 'react-spring';
import { animated } from 'react-spring';

import { useQuiz } from '../hooks';
import { Checkbox, Label } from '../components/Checkbox';
import { Mount } from '../components/Transitions';
import { Section } from '../components/Layout';
import { Heading } from '../components/Headings';
import { TabList, Tab, TabContent } from '../components/Tabs';
import { Button } from '../components/Buttons';

const tabColours = ['lightBlue', 'darkBlue', 'teal'];
const altColours = ['mint', 'teal', 'midBlue', 'peach', 'white'];

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 4px;
  p {
    margin-top: 0;
  }
  ${Label} {
    border-color: ${({ border, checked }) => checked ? 'transparent' : border};

  }
  @media only screen and (min-width: 1200px) {
    margin: 0 0 0 12%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-column-gap: 12px;
  align-items: center;
`;

export const AnimatedDiv = styled(animated.div)`
  margin-bottom: 4px;
  @media only screen and (min-width:768px) {
    max-width: 320px;
  }
  @media only screen and (min-width:1440px) {
    margin-bottom: 12px;
  }
`;

export const Quiz = () => {
  const { questions, state, dispatch } = useQuiz();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const itemHeight = window.matchMedia('(min-width: 1440px)').matches ? 50 : 38;
  const trail = useTrail(questions[questionIndex]?.options.length || 1, {
    config: { duration: 100 },
    opacity: state.page === 'quiz' ? 1 : 0,
    height: state.page === 'quiz' ? itemHeight : 0,
    enter: { opacity: 0, height: itemHeight },
    exit: { opacity: 0, height: 0 }
  });

  const handleChange = (level, value) => {
    dispatch({
      key: questions[questionIndex].id,
      value: {
        ...state[questions[questionIndex].id],
        [level]: state[questions[questionIndex].id]?.[level] === value ? undefined : value
      }
    });
  };

  const handleNext = () => {
    if (tabIndex < questions[questionIndex].levels.length - 1) {
      setTabIndex(tabIndex + 1);
    } else if (questionIndex < questions.length - 1) {
      setTabIndex(0);
      setQuestionIndex(questionIndex + 1);
    } else {
      dispatch({ key: 'page', value: 'savings' });
    }
  };

  const imgBottom = window.matchMedia('(max-width: 1439px)').matches ? '-80px' : 0;

  if (questions.length === 0) {
    return null;
  }

  return (
    <Mount show={state.page === 'quiz'}>
      <Section image={questions[questionIndex].image} title={questions[questionIndex].resultsTab} bottom={imgBottom}>
        <Wrapper
          border={tabColours[tabIndex % tabColours.length] === 'lightBlue' ? 'darkBlue' : 'white'}
        >
          <Grid>
            <Heading>
              Q{questions[questionIndex].questionNumber}.
            </Heading>
            <TabList activeIndex={tabIndex}>
              {questions[questionIndex].levels.map((tab, i) => (
                <Tab
                  key={i}
                  colour={tabColours[i % tabColours.length] === 'lightBlue' ? 'darkBlue' : 'white'}
                  background={tabColours[i % tabColours.length]}
                  altBackground={tabColours[tabIndex]}
                  onClick={() => setTabIndex(i)}
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
          </Grid>
          {questions[questionIndex].levels.map((tab, i) => (
            <TabContent
              key={i}
              colour={tabColours[i % tabColours.length] === 'lightBlue' ? 'darkBlue' : 'white'}
              background={tabColours[i % tabColours.length]}
              border={altColours[questionIndex % altColours.length]}
              isActive={tabIndex === i}
            >
              <Mount show={tabIndex === i} from={{ opacity: 0 }} width="100%" padding="22px">
                <p>
                  {questions[questionIndex].text.replace(/{level}/g, tab.toLowerCase())}
                </p>
                {trail.map((style, index) => (
                  <AnimatedDiv key={index} style={style}>
                    <Checkbox
                      id={questions[questionIndex].id}
                      index={index}
                      label={questions[questionIndex].options[index]}
                      checked={state[questions[questionIndex].id]?.[tab] === questions[questionIndex].options[index]}
                      onChange={() => handleChange(tab, questions[questionIndex].options[index])}
                    />
                  </AnimatedDiv>
                ))}
                <Button
                  borderless
                  margin="4px 0 0 0"
                  onClick={handleNext}
                  disabled={!!!state[questions[questionIndex].id]?.[tab]}
                >
                  Next
              </Button>
              </Mount>
            </TabContent>
          ))}
        </Wrapper>
      </Section>
    </Mount>
  );
};