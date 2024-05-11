import "./App.css";

import { Trivia } from "./components/index";

function App() {
  return (
    <>
      <Trivia
        question="Which scientist is known for developing the theory of relativity, which revolutionized our understanding of space, time, and gravity?"
        options={[
          "Isaac Newton",
          "Albert Einstein",
          "Galileo Galilei",
          "Nikola Tesla",
        ]}
        correctOption="Isaac Newton"
        description="The correct option is B) Albert Einstein. Albert Einstein, a German-born physicist, is widely recognized for his groundbreaking contributions to theoretical physics. His theory of relativity, encompassing both special relativity and general relativity, transformed our understanding of fundamental concepts such as space, time, and gravity. Special relativity, proposed in 1905, introduced the concept of spacetime and the famous equation E=mc^2, which describes the equivalence of mass and energy. General relativity, developed in 1915, provided a new understanding of gravity as the curvature of spacetime caused by mass and energy. Einstein's theories have had profound implications for modern physics, cosmology, and our comprehension of the universe.






        "
      />
    </>
  );
}

export default App;
