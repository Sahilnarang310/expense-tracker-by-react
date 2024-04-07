// App.js
import { useSelector } from 'react-redux';
// import CartButton from './components/CartButton';

const App = () => {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div>
      <h1>My Online Store</h1>
      {Object.keys(cartItems).map(id => (
        <div key={id}>
          <p>Item ID: {id}</p>
          <p>Quantity: {cartItems[id].quantity}</p>
        </div>
      ))}
      <CartButton id="1" />
    </div>
  );
};

export default App;
