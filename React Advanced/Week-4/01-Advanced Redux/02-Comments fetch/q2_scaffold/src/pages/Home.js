import { useEffect } from 'react';
import { List } from '../components/List';
import { useDispatch } from 'react-redux';
import {
  setComments,
  showError,
  showLoading,
} from '../redux/reducers/commentsReducer';
// import comments actions here

export const Home = () => {
  const dispatch = useDispatch();
  const getComments = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      );
      const data = await response.json();

      // dispatch fetch success action here
      dispatch(setComments(data));
    } catch (e) {
      // dispatch fetch error action here
      dispatch(showError(e));
    }
  };

  useEffect(() => {
    // dispatch fetch start action here
    // execute the getComments function here
    dispatch(showLoading());
    getComments();
  }, []);

  return (
    <div className='home'>
      <h3>Internet Comments</h3>
      <List />
    </div>
  );
};
