import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    setTotal(totalPrice);
  }, [cart, setTotal]);

  return (
    <div className="container">
      <Header cart={cart.reduce((n, { quantity }) => n + quantity, 0)} />
      <Outlet context={[cart, setCart, total, setTotal]} />
      <Footer />
    </div>
  );
}
