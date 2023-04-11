import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { baselightTheme } from './theme/DefaultColors';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <ToastContainer />
        <CssBaseline />
        {routing}
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
