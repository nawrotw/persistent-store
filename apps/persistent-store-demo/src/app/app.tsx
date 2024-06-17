import { Paper, styled, Grid, createTheme, useMediaQuery, ThemeProvider, CssBaseline } from "@mui/material";
import { PrimitiveValues } from "./components/PrimitiveValues";
import { ComplexObjects } from "./components/ComplexObjects";
import { useMemo } from "react";

const Root = styled('div')`
  padding: ${({ theme }) => theme.spacing(1)};
`

export function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Root>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <PrimitiveValues/>
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
