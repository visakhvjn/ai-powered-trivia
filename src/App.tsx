import "./App.css";
// import BrainIcon from './assets/brain_ai.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Categories, Login, NotFound, Trivia } from "./pages";

// import { Coin, Header, Hero, Logo, Trivia } from "./components/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/categories" index element={<Categories />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="*" index element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // <div className="flex flex-col w-full items-center justify-center text-black">
    //   <Header>
    //     <div className="flex justify-between w-full">
    //       <Logo />
    //       <Coin />
    //     </div>
    //   </Header>
    //   <Hero>
    //     <div className="flex items-center">
    //       <img className="border border-black rounded-full p-4" src={BrainIcon} />
    //       <span className="text-shadow-md text-6xl font-bold">&nbsp;trivia.ai</span>
    //     </div>
    //   </Hero>
    //   <div className="flex">
    //     <Trivia />
    //   </div>
    // </div>
  );
}

export default App;
