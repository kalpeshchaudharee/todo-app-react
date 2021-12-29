import { Routes, Route } from "react-router-dom";
import List from "./Pages/List";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
    </Routes>
  );
}

export default App;
