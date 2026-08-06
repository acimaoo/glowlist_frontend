import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";   

export default function Produk() {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getProduk = async () => {
        try {
            const res = await fetch ("http://localhost:5000/produk");
            const data = await res.json();
            setProduk(data);
        } catch (err) {
            console.error("TGagal fecth data:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProduk();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            try {
                const res = await fetch(`http://localhost:5000/produk/${id}`, {
                    method: "DELETE",
                })
                if (res.ok) {
                    alert("Produk berhasil dihapus!");
                    getProduk(); //mengambil ulang data terbaru
                } else {
                    alert("Gagal menghapus produk");
                }
            } catch (err) {
                console.error("Error saat delete:", err);
                alert("Terjadi kesalahan saat menghapus data");
            }
        }
    }

    const handleEdit = (id) => {
        navigate(`/produk/edit/${id}`)
    }

    if (loading) {
        return <div className="container mt-4"> Sedang Memuat Data... </div>
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Daftar Produk</h2>
                <Link to="/produk/tambah" className="btn btn-primary">+ Produk</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Produk</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.length > 0 ? (
                        produk.map((item) => (
                            <tr key={item.id_produk}>
                                <td>{item.id_produk}</td>
                                <td>{item.judul}</td>
                                <td>{item.deskripsi}</td>
                                <td>Rp {item.harga.toLocaleString()}</td>
                                <td>
                                    <div className="d-flex gap-1">
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(item.id_produk)}
                                    >Edit</button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id_produk)}
                                    >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                raenek produk.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}