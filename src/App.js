import './App.css';
import { Body, Navbar, Checkout, Login } from './Components/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
