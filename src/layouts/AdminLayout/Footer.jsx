import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="admin-footer">
      <div>
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <Logo />
              <span className="small">© 2025 CyberMy, Inc.</span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-link btn-sm text-decoration-none p-0">
                Cookie settings
              </button>

              <button className="btn btn-outline-light btn-sm d-flex align-items-center gap-2">
                <span className="material-icons-outlined">Tiếng</span>
                <span>Việt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
