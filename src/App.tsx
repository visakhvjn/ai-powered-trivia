import "./App.css";

import { Coin, Header, Logo, Trivia } from "./components/index";

function App() {
  return (
    <div className="flex w-full items-center justify-center text-black">
      <Header>
        <div className="flex justify-between w-full">
          <Logo />
          <Coin />
        </div>
      </Header>
      <div>
        <Trivia />
      </div>
    </div>
  );
}

export default App;
