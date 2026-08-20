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
    const [fileBaru, setFileBaru] = useState(null);

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

        if (file && file.size > 2 * 1024 * 1024) {
            alert("Ukuran file terlalu besar, maksimal 2MB");
            return;
        }

        const data = new FormData();
        data.append("judul", formData.judul);
        data.append("deskripsi", formData.deskripsi);
        data.append("harga", formData.harga);
        data.append("id_kategori", formData.id_kategori);
        if (fileBaru) {
            data.append("file", fileBaru); //hanya kirim kalau ada foto baru
        }

        if (!window.confirm("Yakin menyimpan perubahan ini?")) {
            return;
        }
        try {
            const res = await fetch(`http://localhost:5000/produk/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: data,
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
                
                <div className="mb-3">
                    <label className="from-label">Foto saat ini</label>
                    <div>
                        {formData.nama_file ? (
                            <img
                                src={`http://localhost:5000/uploads/${formData.nama_file}`}
                                alt="Foto lama"
                                style={{ width: "120px", berderRadius: "8px" }}
                            />
                        ) : (
                            <p>Tidak ada foto</p>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Ganti Foto (opsional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setFileBaru(e.target.files[0])}
                    />
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