import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignInEmail from './pages/SignInEmail';
import SignIn from './pages/SignIn';
import Top from './pages/Top';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './libs/firebase';
import Settings from './pages/Settings';
import SignUpEmail from './pages/SignUpEmail';
import NotFound from './pages/NotFound';
import EmailVerification from './pages/EmailVerification';
import Footer from './components/Footer';

const App = () => {

  const [user] = useAuthState(auth)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={user ? (user.emailVerified ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />) : (<Top />)} />
        <Route path="/signup/email" element={user ? (user.emailVerified ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />) : <SignUpEmail />} />
        <Route path="/signup/email/verify" element={user ? (user.emailVerified ? < Navigate to="/home" /> : <EmailVerification />) : < Navigate to="/" />} />
        <Route path="/signin" element={user ? (user.emailVerified ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />) : <SignIn/>} />
        <Route path="/signin/email" element={user ? (user.emailVerified ? < Navigate to="/home" /> : < Navigate to="/signup/email/verify" />) : <SignInEmail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={user ? (user.emailVerified ? <Home /> : < Navigate to="/signup/email/verify" />) : < Navigate to="/" />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
