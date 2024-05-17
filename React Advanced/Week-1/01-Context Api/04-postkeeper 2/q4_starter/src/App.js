import "./styles.css";
import { Navbar } from "./Navbar";
import { List } from "./List";
import { PostContextProvider } from "./postContext";

export default function App() {
  return (
    <div className="App">
      <PostContextProvider>
        <Navbar />
        <List />
      </PostContextProvider>
    </div>
  );
}
