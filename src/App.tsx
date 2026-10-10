import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ModuleView } from './pages/ModuleView';
import { GreenTwin } from './features/voyages/GreenTwin';
import { FuelTrust } from './features/fuel/FuelTrust';
import { SmartDock } from './features/port/SmartDock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Homepage */}
        <Route path="/" element={<Home />} />

        {/* GreenTwin Dedicated Feature Page */}
        <Route path="/greentwin" element={<GreenTwin />} />
        <Route path="/dashboard/greentwin" element={<GreenTwin />} />

        {/* FuelTrust Dedicated Feature Page */}
        <Route path="/fueltrust" element={<FuelTrust />} />
        <Route path="/dashboard/fueltrust" element={<FuelTrust />} />

        {/* SmartDock Dedicated Feature Page */}
        <Route path="/smartdock" element={<SmartDock />} />
        <Route path="/dashboard/smartdock" element={<SmartDock />} />

        {/* Corridor Operations Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:moduleKey" element={<ModuleView />} />

        {/* Module deep-links navigate to their dashboard views */}
        <Route path="/greenpulse" element={<ModuleView />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
