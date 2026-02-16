import { Routers } from '@pages/route';
import './styles/App.css';
import './styles/antd.css';
import { useCacheBuster } from '@shared/hooks/use-cache-buster';

function App() {
  useCacheBuster();

  return <Routers />;
}

export default App;
