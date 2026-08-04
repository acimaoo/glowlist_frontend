import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand text-white ps-4">MaoGlow</Link>
            <button className="btn btn-danger ms-auto me-4">Logout</button>
        </nav>
    )
}