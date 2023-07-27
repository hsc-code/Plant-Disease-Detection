import './Navbar.css';
import {Link} from "react-router-dom";
export default function Navbar(){
    return (
        
    <nav className="nav">
        <h1 className="title"><Link to="/">Plant Disease Detection</Link> </h1>
        <ul>
            <li>
                <Link to="/disease-detection"> Disease Detection</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
    </nav>
    )
}
