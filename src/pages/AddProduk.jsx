import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [kategori, setKategori] = useState([]);
    const [ formData, setFormData ] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/produk", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
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

   useEffect(() => {
    const fetchKategori = async () => {
        try {
            const res = await fetch("http://localhost:5000/kategori");
            const data = await res.json();
            setKategori(data);
        } catch (err) {
            console.error("Gagal mengambil data kategori:", err);
        }
    };

    fetchKategori();
}, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Produk</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
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
                        value={formData.deskripsi}
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
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan harga"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        name="id_kategori"
                        value={formData.id_kategori}   
                        onChange={handleChange}
                        className="form-select"
                        required>
                        <option value="">Pilih kategori</option>
                        {kategori.map((item) => (
                            <option
                                key={item.id_kategori}
                                value={item.id_kategori}>
                                {item.kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                <button type="submit" className="btn btn-success">
                    Simpan
                </button>
                <span className="mx-2"></span>
                <button type="button" className="btn btn-danger" onClick={() => navigate("/produk")}>
                    Batal
                </button>
                </div>

            </form>
        </div>
    )
}