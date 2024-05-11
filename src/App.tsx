import "./App.css";

import { Trivia } from "./components/index";

function App() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-3/4">
        <Trivia />
      </div>
    </div>
  );
}

export default App;
