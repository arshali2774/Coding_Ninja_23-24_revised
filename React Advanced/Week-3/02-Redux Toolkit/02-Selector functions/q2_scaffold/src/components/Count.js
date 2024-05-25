import { useSelector } from 'react-redux';
import { counterSelector } from '../redux/reducers/counterReducer';

export const Count = () => {
  // refactor to use the selector function
  const { count } = useSelector((state) => counterSelector);

  return <b>{count}</b>;
};
