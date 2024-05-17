import { useState } from "react";
import { usePostsValue } from "./postContext";

export const Navbar = () => {
  const [showSavedList, setShowSavedList] = useState(false);
  const { savedPosts, resetPosts } = usePostsValue();

  return (
    <div className="navbar">
      <span onClick={() => setShowSavedList(!showSavedList)}>
        Saved Posts: {savedPosts.length}
      </span>
      {showSavedList && (
        <div className="saved-list">
          {savedPosts.map((p) => (
            <div className="saved-post" key={p.id}>
              <h3>{p.text}</h3>
              <img src={p.img} alt={p.text} />
            </div>
          ))}
        </div>
      )}
      <button onClick={resetPosts}>Reset</button>
    </div>
  );
};
