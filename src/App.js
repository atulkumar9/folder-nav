import "./App.css";
import { ApiProvider } from "./contexts/apiContext";
import Root from "./components/Root";

function App() {
  return (
    <div className="App">
      <ApiProvider>
        <Root />
      </ApiProvider>
    </div>
  );
}

export default App;
