import { StoreProvider } from './store';
import { Dashboard } from './components/Dashboard';

export default function App() {
  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  );
}

