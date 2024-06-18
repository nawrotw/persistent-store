import { styled, Grid, createTheme, useMediaQuery, ThemeProvider, CssBaseline, } from '@mui/material';
import { PrimitiveValues } from './components/PrimitiveValues';
import { ComplexObjects } from './components/ComplexObjects';
import { useMemo, useEffect } from 'react';
import { useStoreSelector } from "../store/store";
import { appStore } from "./AppStore";
import { useActions } from "@ns/redux-persistent-store";

const Root = styled('div')`
  padding: ${({ theme }) => theme.spacing(1)};
`;

export function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const storeActions = useActions(appStore.actions);
  const { count, count2, user, plainUser } = useStoreSelector((state) => state.app);

  useEffect(() => console.log('User model:', user), [user]);
  useEffect(() => console.log('User plain:', plainUser), [plainUser]);

  const incrementCounts = () => {
    storeActions.updateCount(count + 1);
    storeActions.updateCount2(count2 + 1);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Root>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <PrimitiveValues persistentCounter={count} transientCounter={count2} incrementCounters={incrementCounts}/>
          </Grid>
          <Grid item>
            <ComplexObjects/>
          </Grid>
        </Grid>
      </Root>
    </ThemeProvider>
  );
}

export default App;
