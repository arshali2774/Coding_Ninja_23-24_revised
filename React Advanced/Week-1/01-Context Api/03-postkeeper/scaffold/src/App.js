import './styles.css';
import { Navbar } from './Navbar';
import { List } from './List';
import { SavedPostProvider } from './postContext';

export default function App() {
  return (
    //Add the Context provider here
    <SavedPostProvider>
      <div className='App'>
        <Navbar />
        <List />
      </div>
    </SavedPostProvider>
  );
}
