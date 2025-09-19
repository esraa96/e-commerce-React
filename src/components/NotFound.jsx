import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 — Page not found</h1>
        <p className="mb-4">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-500 underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
