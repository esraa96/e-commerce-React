import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ image, title, id }) {
  let navigate = useNavigate();

  return (
    <div
      className="card shadow rounded-4 border-0 m-3 p-2 bg-white"
      style={{
        width: "18rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <img
        src={image}
        className="card-img-top rounded-top"
        alt={title}
        style={{ height: "200px", objectFit: "contain", background: "#f9f9f9" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h6 className="card-title text-center fw-bold">{title}</h6>
        <p className="card-text text-muted text-center" style={{ fontSize: "0.9rem" }}>
          Explore this product in more detail.
        </p>
        <button
          onClick={() => navigate(`/detiels/${id}`)}
          className="btn btn-dark rounded-pill w-100 py-2 mt-auto"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default Card;
