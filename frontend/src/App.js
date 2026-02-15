import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <div>Hello</div> */}
        <Route path="/" element={<ListPage />} />
        <Route path="/incident/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
