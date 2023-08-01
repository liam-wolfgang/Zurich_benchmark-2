import { ThemeProvider } from 'styled-components';

import { AppCtx } from './utils';
import { GlobalStyle, theme } from './styles';
import { useForm } from './hooks';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Children } from './views/Children';
import { Quiz } from './views/Quiz';
import { Savings } from './views/Savings';
import { Email } from './views/Email';
import { Results } from './views/Results';

export const App = () => {
  const [state, dispatch] = useForm();

  return (
    <AppCtx.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          {state.page === 'home' && <Home />}
          {state.page === 'children' && <Children />}
          {state.page === 'quiz' && <Quiz />}
          {(state.page === 'savings' || state.page === 'savings-amount') && <Savings />}
          {state.page === 'email' && <Email />}
          {state.page === 'results' && <Results />}
        </Layout>
      </ThemeProvider>
    </AppCtx.Provider>
  );
};
