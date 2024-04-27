import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from './routes/Routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

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