import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ModuleView } from './pages/ModuleView';
import { GreenTwin } from './features/voyages/GreenTwin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Homepage */}
        <Route path="/" element={<Home />} />

        {/* GreenTwin Dedicated Feature Page */}
        <Route path="/greentwin" element={<GreenTwin />} />
        <Route path="/dashboard/greentwin" element={<GreenTwin />} />

        {/* Corridor Operations Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:moduleKey" element={<ModuleView />} />

        {/* Module deep-links navigate to their dashboard views */}
        <Route path="/fueltrust" element={<ModuleView />} />
        <Route path="/smartdock" element={<ModuleView />} />
        <Route path="/greenpulse" element={<ModuleView />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
