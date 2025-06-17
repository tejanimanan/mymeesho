import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterForm from './pages/Register';
import HomePage from './pages/HomePage';
import LoginForm from './pages/Login';
import Navbar from './comonent/NavBar';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
function AppWrapper() {
  const location = useLocation();
  const [user, setUser] = useState(null);
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);
  // List of routes where navbar should be hidden
  const hideNavbarRoutes = ['/login', '/register', '/cart'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  

  return (
    <>
      {!shouldHideNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
      </Routes>
    </>
  );
}
function App() {

  return (
    <div className="App">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
