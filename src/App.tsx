import './App.css';
import Routing from './Routing';
import { TokenProvider } from './Auth/useAuth';

const App = () => {
  return (
    <TokenProvider>
      <Routing />
    </TokenProvider>
  );
};

export default App;
