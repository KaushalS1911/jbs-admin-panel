import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes/Routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

// ==============================|| APP ||============================== //

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});
const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
          </QueryClientProvider>
        </RecoilRoot>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
