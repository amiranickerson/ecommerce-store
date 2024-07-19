import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const [cart, setCart, total, setTotal] = useOutletContext();

  function remove(toBeRemoved) {
    const result = cart.filter((product) => product.id !== toBeRemoved);
    setCart(result);
  }

  function changeQuantity(event, productId) {
    const value = event.target.value;

    if (value > 0) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: parseInt(value),
          };
        } else {
          return item;
        }
      });

      setCart(updatedCart);
    } else {
      confirm("Remove from cart?") ? remove(productId) : false;
    }
  }
  return (
    <>
      <div className="page-header">
        <h1>Your Cart</h1>
      </div>
      {cart.length === 0 ? (
        <p className="cart-empty">You Gotta Keep Shopping</p>
      ) : (
        <div className="cart">
          <div>
            {cart.map((product) => (
              <div key={product.id} className="product-cart">
                <div className="img-wrapper">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="text-wrapper">
                  <h2 className="accent-text">{product.title}</h2>
                  <span>
                    <small>Price</small>
                    <p>${product.price}</p>
                  </span>
                  <span>
                    <label
                      htmlFor={`${product.title}-quantity`}
                      className="small"
                    >
                      Quantity
                    </label>
                    <br />
                    <input
                      type="number"
                      id={`1quantity-${product.id}`}
                      name="quantity"
                      value={product.quantity}
                      onChange={(event) => changeQuantity(event, product.id)}
                    />
                  </span>
                  <div className="product-total">
                    <small>Total</small>
                    <p>${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <p className="accent-text">Payment Details</p>
            <small>Total</small>
            <p className="price">${total.toFixed(2)}</p>
            <br />
            <button className="button-custom">Checkout</button>
          </div>
        </div>
      )}
    </>
  );
}
