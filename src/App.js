import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import RegisterForm from './pages/Register';
import HomePage from './pages/HomePage';
import LoginForm from './pages/Login';
import Navbar from './comonent/NavBar';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Payment from './pages/Payment';
import Summary from './pages/Summary';

function AppWrapper() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Oppo F23 (5G) Cover | Camera Protection Shockproof',
      price: 170,
      qty: 2,
      img: '/images/mymeesho.png',
    },
    {
      id: 2,
      name: 'Samsung M33 (5G) Cover | Shockproof Bumper',
      price: 150,
      qty: 1,
      img: '/images/mymeesho.png',
    },
    {
      id: 3,
      name: 'iPhone 13 Case | Crystal Clear',
      price: 250,
      qty: 1,
      img: '/images/mymeesho.png',
    },
  ]);

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
  const hideNavbarRoutes = ['/login', '/register', '/cart','/address','/payment','/summary'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  

  return (
    <>
      {!shouldHideNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/address" element={<Address cartItems={cartItems} onContinue={() => window.location.href = '/payment'} />} />
        <Route path="/payment" element={<Payment cartItems={cartItems} onContinue={() => window.location.href = '/summary'} />} />
        <Route path="/summary" element={<Summary cartItems={cartItems} />} />
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
