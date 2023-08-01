import { useReducer, useContext, useEffect, useMemo } from 'react';

import questionData from './data/questions.json';
import answerData from './data/answers.json';
import { AppCtx } from './utils';

const formState = {
  page: 'home',
  totalQuestions: 0,
  numPrimary: 0,
  numSecondary: 0,
  numCollege: 0,
  hasSavingsAccount: false,
  savingsOptionSelected: false,
  amountSaved: '',
  optIn: false,
  readPolicy: false,
  email: ''
};

const formReducer = (state, { key, value }) => {
  return {
    ...state,
    [key]: value
  };
};

export const useForm = () => {
  const [state, dispatch] = useReducer(formReducer, formState);
  return [state, dispatch];
};

export const useQuiz = () => {
  const { state, dispatch } = useContext(AppCtx);

  let i = 2;

  const questions = questionData.reduce((result, question) => {
    const showPrimary = state.numPrimary > 0 && question.levels.includes('Primary School');
    const showSecondary = state.numSecondary > 0 && question.levels.includes('Secondary School');
    const showCollege = state.numCollege > 0 && question.levels.includes('Third Level');

    if (showPrimary || showSecondary || showCollege) {
      result.push({
        ...question,
        questionNumber: i,
        levels: question.levels.filter(level =>
          (level === 'Primary School' && showPrimary) ||
          (level === 'Secondary School' && showSecondary) ||
          (level === 'Third Level' && showCollege)
        )
      });
      i++;
    }
    return result;
  }, []);

  useEffect(() => {
    dispatch({ key: 'totalQuestions', value: questions.length });
  }, [questions.length, dispatch]);

  return {
    questions,
    state,
    dispatch
  }
};

const formatPc = num => num.toLocaleString('en-GB', { style: 'percent' }).replace(/\.0+$/, '');

export const useResults = () => {
  const { questions, state, dispatch } = useQuiz();

  const tabs = questions.map(question => question.resultsTab);

  const results = useMemo(() => {
    return questions.reduce((result, question) => {
      result[question.resultsTab] = {
        id: question.id,
        title: question.resultsTab,
        data: {}
      };

      if (state[question.id]) {
        Object.keys(state[question.id]).forEach(level => {
          result[question.resultsTab].data[level] = answerData[question.id][level];

          const option = answerData[question.id][level].values.find(x => x.label === state[question.id][level]);

          if (!result[question.resultsTab].text) result[question.resultsTab].text = {};

          result[question.resultsTab].text[level] =
            `You spend ${option.relToAvg} this average, being in the <b>${formatPc(option?.value || 0)} that spend ${option.label}`;
        });
      }
      return result;
    }, {});
  }, [questions, state]);

  return {
    tabs,
    state,
    dispatch,
    results
  };
};