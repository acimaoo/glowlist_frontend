import { useState,} from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [ fromData, setFormData ] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...fromData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/produk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fromData)
            });
            if (res.ok) {
                alert("Produk berhasil ditambahkan!");
                navigate("/produk");
            } else {
                const data = await res.json();
                alert(data.message || "Gagal menambahkan produk");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat menambahkan produk");
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Produk</label>
                    <input
                        type="text"
                        name="judul"
                        value={fromData.judul}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan nama produk"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={fromData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan deskripsi produk"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={fromData.harga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan harga"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <input
                        type="number"
                        name="id_kategori"
                        value={fromData.id_kategori}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan ID Kategori"
                        required
                    />
                </div>

                <div>
                <button type="submit" className="btn btn-success">
                    Simpan Produk
                </button>
                <span className="mx-3"></span>
                <button type="button" className="btn btn-danger" onClick={() => navigate("/produk")}>
                    Batal
                </button>
                </div>

            </form>
        </div>
    )
}