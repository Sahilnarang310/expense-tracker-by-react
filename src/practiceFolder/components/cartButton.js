import { useDispatch } from 'react-redux';
import { toggleCart } from '../store/cartSlice';

const CartButton = () => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };

  return <button onClick={toggleCartHandler}>My Cart</button>;
};

export default CartButton;
