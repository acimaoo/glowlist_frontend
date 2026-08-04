import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Produk from "./pages/Produk.jsx";
import Kategori from "./pages/Kategori.jsx";
import Tentang from "./pages/Tentang.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}