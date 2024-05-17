import { useState } from 'react';
import Albums from './components/Albums';
import Header from './components/Header';
import Images from './components/Images';

const App = () => {
  //state to show images of an album
  const [showImages, setShowImages] = useState(null);
  return (
    <>
      <Header />
      {!showImages ? (
        <Albums setShowImages={setShowImages} />
      ) : (
        <Images setShowImages={setShowImages} showImages={showImages} />
      )}
    </>
  );
};
export default App;
