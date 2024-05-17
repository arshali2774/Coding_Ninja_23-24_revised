import './styles.css';
import useFetch from './useCustomHook';
// import the custom hook to use in this document
export default function App() {
  const url = 'https://v2.jokeapi.dev/joke/Programming?type=singl';
  // Use the custom hook here
  const { jokeData, loading, error, fetchJoke } = useFetch(url);
  // Display loading text here
  if (loading) {
    return <h1>Loading....</h1>;
  }
  // Display something went wrong here
  if (error) {
    return <h1>error</h1>;
  }
  return (
    <div className='App'>
      <h1>Joke Generator</h1>
      {/* Do not modify the below code */}
      <h2>{jokeData.joke}</h2>
      <button className='btn' onClick={fetchJoke}>
        New Joke
      </button>
    </div>
  );
}
