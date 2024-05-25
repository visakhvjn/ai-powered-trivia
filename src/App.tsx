import "./App.css";
// import BrainIcon from './assets/brain_ai.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Categories, Login, NotFound, Trivia } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "./components";

// import { Coin, Header, Hero, Logo, Trivia } from "./components/index";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/categories"
              element={isAuthenticated ? <Categories /> : <Navigate to="/" />}
            />
            <Route
              path="/trivia"
              element={isAuthenticated ? <Trivia /> : <Navigate to="/" />}
            />
            <Route path="*" index element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
