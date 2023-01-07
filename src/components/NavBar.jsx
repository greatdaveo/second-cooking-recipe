import { Link } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Recipe</h1>
        </Link>

        <SearchBar/>
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
