import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">MaoGlow</Link>
            <button className="btn btn-danger">Logout</button>
        </nav>
    )
}