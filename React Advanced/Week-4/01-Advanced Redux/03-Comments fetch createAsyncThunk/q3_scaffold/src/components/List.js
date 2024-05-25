import { useSelector } from 'react-redux';
import { commentsSelector } from '../redux/reducers/commentsReducer';

export const List = () => {
  const { isLoading, error, comments } = useSelector(commentsSelector);

  if (isLoading) {
    return <div className='message'>Loading...</div>;
  }
  if (error) {
    return <div className='message'>{error}</div>;
  }
  return (
    <div className='list'>
      {comments.map((c) => (
        <div className='card' key={c.id}>
          <h3>Name: {c.email.split('@')[0]}</h3>
          <p>{c.body.length <= 100 ? c.body : c.body.substring(100)}</p>
        </div>
      ))}
    </div>
  );
};
