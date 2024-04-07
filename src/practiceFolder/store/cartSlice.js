import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const CartButton = ({ id }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ id, quantity: 1 }));
  };

  return <button onClick={addToCartHandler}>Add to Cart</button>;
};

export default CartButton;
