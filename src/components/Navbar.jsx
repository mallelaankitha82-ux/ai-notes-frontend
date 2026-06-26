import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/dashboard"
        >
           AI Notes
        </Link>

        <div>

          <Link
            className="btn btn-outline-light me-2"
            to="/generate"
          >
            Generate
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/notes"
          >
            My Notes
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/upload"
          >
            Upload PDF
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}