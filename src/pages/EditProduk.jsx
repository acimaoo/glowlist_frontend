import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [kategori, setKategori] = useState([]);
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, });
    };

    // untuk mengambil data produk
    useEffect(() => {
        const fetchProduk = async () => {
            try {
                const res = await fetch(`http://localhost:5000/produk/${id}`);
                const data = await res.json();

                setFormData(data[0]);
            } catch (err) {
                console.error("Gagal mengambil data produk:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduk();
    }, [id]);

    // untuk menganmbil data kategori
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

    const handleSubmit = async (e) => {
        e.preventDefault();
            if (!window.confirm("Yakin menyimpan perubahan ini?")) {
                return;
            }
        try {
            const res = await fetch(`http://localhost:5000/produk/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Produk berhasil diperbarui!");
                navigate("/produk");
            } else {
                alert("Gagal memperbarui produk");
            }
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan.");
        }
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Produk</h2>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Pilih kategori</option>
                        {kategori.map((item) => (
                            <option
                                key={item.id_kategori}
                                value={item.id_kategori}
                            >
                                {item.kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Simpan Perubahan
                </button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/produk")}
                >
                    Batal
                </button>
            </form>
        </div>
    );
}