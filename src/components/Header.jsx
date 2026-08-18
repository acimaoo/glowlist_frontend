import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand text-white ps-4">MaoGlow</Link>
            <button onClick={handleLogout} className="btn btn-danger ms-auto me-4">Logout</button>
        </nav>
    )
}