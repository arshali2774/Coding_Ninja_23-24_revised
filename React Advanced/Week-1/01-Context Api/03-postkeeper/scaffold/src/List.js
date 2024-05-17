import { posts } from './data';
import { usePost } from './postContext';

export const List = () => {
  // Use values from the context using the custom hook
  const { savedPost, addPost } = usePost();
  return (
    <div className='list'>
      {posts.map((p) => (
        <div className='post' key={p.id}>
          <h3>{p.text}</h3>
          <img src={p.img} alt={p.text} />
          {/* Add the onclick event on the save button */}
          <img
            src='https://cdn-icons-png.flaticon.com/512/102/102279.png'
            alt='save'
            onClick={() => addPost(p)}
          />
        </div>
      ))}
    </div>
  );
};
