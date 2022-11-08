import { createGlobalStyle } from "styled-components";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainPage from "features/MainPage";
import BinaryTree from "features/BinaryTree";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <BrowserRouter basename="/structures-vizualizer/">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/binary-tree" element={<BinaryTree />} />
      </Routes>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
