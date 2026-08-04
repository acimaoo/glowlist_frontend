import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav classname="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Glowlist</Link>
            <button classname="btn btn-danger" type="button">Logout</button>
        </nav>
    )
}