import { useOutletContext } from "react-router-dom";

export default function Product(props) {
  const [cart, setCart] = useOutletContext();

  function changeText(event) {
    let txt = event.target.innerHTML;

    if (txt == "Add to Cart") {
      txt = "Added";
      setTimeout(function () {
        event.target.innerHTML = "Add to Cart";
      }, 2000);
    }
    event.target.innerHTML = txt;
  }
  function addToCart(event) {
    changeText(event);

    let quantity = 1;

    if (cart.some((product) => product.id === props.id)) {
      const updatedCart = cart.map((product) => {
        if (product.id === props.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return product;
        }
      });

      setCart(updatedCart);
    } else {
      let newItem = {
        id: props.id,
        image: props.image,
        title: props.title,
        description: props.description,
        price: props.price,
        quantity: quantity,
      };
      setCart((prev) => [...prev, newItem]);
    }
  }

  return (
    <div className="product">
      <div className="img-wrapper">
        <img src={props.image} alt={props.title} className="img-fluid" />
      </div>

      <div className="text-wrapper">
        <h2 className="accent-text">{props.title}</h2>
        <p className="product-description">{props.description}</p>
        <p className="big">{props.price}</p>
        <button
          className="button-custom change-text mobile-add-to-cart"
          onClick={() => addToCart(event)}
        >
          Add to Cart
        </button>
      </div>

      <button
        className="button-custom change-text add-to-cart"
        onClick={() => addToCart(event)}
      >
        Add to Cart
      </button>
    </div>
  );
}
