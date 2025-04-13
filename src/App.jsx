import { ThemeProvider } from './contexts/ThemeContext';
import Main from './components/Main';
import Nav from './components/Nav';

function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Main />
    </ThemeProvider>
  );
}

export default App;
