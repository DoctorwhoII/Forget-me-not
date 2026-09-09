import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CalendarPage } from './pages/CalendarPage';
import { GiftsPage } from './pages/GiftsPage';
import { GiftDetailPage } from './pages/GiftDetailPage';
import { RecommendationPage } from './pages/RecommendationPage';
import { SelectGiftPage } from './pages/SelectGiftPage';
import { ConfigurePlanPage } from './pages/ConfigurePlanPage';
import { AddPersonPage } from './pages/AddPersonPage';
import { EditPersonPage } from './pages/EditPersonPage';
import { PersonProfilePage } from './pages/PersonProfilePage';
import { AddOccasionPage } from './pages/AddOccasionPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { GiftHistoryPage } from './pages/GiftHistoryPage';
import { NotificationCenterPage } from './pages/NotificationCenterPage';
import { SettingsPage } from './pages/SettingsPage';
import { TiersPage } from './pages/TiersPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="gifts" element={<GiftsPage />} />
            <Route path="gifts/:giftId" element={<GiftDetailPage />} />
            <Route path="people/:personId/occasions/:occasionId/recommendations" element={<RecommendationPage />} />
            <Route path="people/:personId/occasions/:occasionId/select-gift" element={<SelectGiftPage />} />
            <Route path="plans/:planId/configure" element={<ConfigurePlanPage />} />
            <Route path="add-person" element={<AddPersonPage />} />
            <Route path="history" element={<GiftHistoryPage />} />
            <Route path="notifications" element={<NotificationCenterPage />} />
            <Route path="tiers" element={<TiersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="people/:personId" element={<PersonProfilePage />} />
            <Route path="people/:personId/edit" element={<EditPersonPage />} />
            <Route path="people/:personId/add-occasion" element={<AddOccasionPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
