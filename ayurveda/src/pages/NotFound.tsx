import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="container" style={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ marginTop: 0 }}>Page not found</h2>
        <Link className="button" to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
