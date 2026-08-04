import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Glowlist</Link>
            <button className="btn btn-danger" type="button">Logout</button>
        </nav>
    )
}