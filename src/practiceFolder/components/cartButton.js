// CartButton.js
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, fetchCartItems } from '../store/cartSlice';

const CartButton = ({ id }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const addToCartHandler = () => {
    if (cartItems[id]) {
      dispatch(updateQuantity({ id, quantity: cartItems[id].quantity + 1 }));
    } else {
      dispatch(addToCart({ id, quantity: 1 }));
    }
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return <button onClick={addToCartHandler}>Add to Cart</button>;
};

export default CartButton;
