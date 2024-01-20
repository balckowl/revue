import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './libs/firebase';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import EmailVerification from './pages/EmailVerification';
import Footer from './components/Footer';
import Pricing from './pages/Pricing';

const App = () => {

  const [user] = useAuthState(auth)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={user ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />} />
        <Route path="/signup/email" element={user ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />} />
        <Route path="/signup/email/verify" element={user ? < Navigate to="/home" /> : <EmailVerification />} />
        <Route path="/signin" element={user ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />} />
        <Route path="/signin/email" element={user ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={user ?  <Home /> : < Navigate to="/signup/email/verify" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
