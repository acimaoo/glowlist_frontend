import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

import Produk from "./pages/Produk.jsx";
import AddProduk from "./pages/AddProduk.jsx";
import EditProduk from "./pages/EditProduk.jsx";

import Kategori from "./pages/Kategori.jsx";
import Tentang from "./pages/Tentang.jsx";

import { Navigate } from "react-router-dom";
import  Login from "./pages/Login.jsx";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="produk/tambah" element={<AddProduk />} />
          <Route path="produk/edit/:id" element={<EditProduk />}/>

          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}