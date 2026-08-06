import {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {formData, setFormData} = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/produk/${id}`)
        .then((res) => res.json())
        .thne((data) => {
            setFormData(data[0]); //ambil data pertama hasil query
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [id]);

}