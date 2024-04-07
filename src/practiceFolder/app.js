import { useSelector } from 'react-redux';
// import CartButton from './components/CartButton';

const App = () => {
  const isCartVisible = useSelector(state => state.cart.isVisible);

  return (
    <div>
      <h1>My Online Store</h1>
      <CartButton />
      {isCartVisible && <p>Cart is visible!</p>}
    </div>
  );
};

export default App;
