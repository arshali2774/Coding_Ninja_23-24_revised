import { useState } from 'react';
import { usePost } from './postContext';

export const Navbar = () => {
  // remove this and get the value from context
  // const [savedPosts, setSavedPosts] = useState([]);
  const { savedPost, resetPosts } = usePost();
  console.log(savedPost);
  const [showSavedList, setShowSavedList] = useState(false);

  return (
    <div className='navbar'>
      <span onClick={() => setShowSavedList(!showSavedList)}>
        Saved Posts: {savedPost.length}
      </span>
      {showSavedList && (
        <div className='saved-list'>
          {savedPost.map((p) => (
            <div className='saved-post' key={p.id}>
              <h3>{p.text}</h3>
              <img src={p.img} alt={p.text} />
            </div>
          ))}
        </div>
      )}
      {/* Add onClick functionality for the reset button */}
      <button onClick={resetPosts}>Reset</button>
    </div>
  );
};
