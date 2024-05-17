import { useContext, useState, createContext } from 'react';

// create post context here
const PostContext = createContext();
// Create custom hook that returns context value here
export const usePost = () => useContext(PostContext);

// create a custom saved post provider here with add and reset functions
export const SavedPostProvider = ({ children }) => {
  const [savedPost, setSavedPost] = useState([]);
  // Function to add a post to the saved posts
  const addPost = (post) => {
    setSavedPost((prevPosts) => [...prevPosts, post]);
  };

  // Function to reset the saved posts
  const resetPosts = () => {
    setSavedPost([]);
  };

  const value = { savedPost, addPost, resetPosts };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
