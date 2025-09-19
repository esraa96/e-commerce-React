import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favorites/favoritesSlice";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchProduct();
  }, [id]);

  const isFavorite = product && favorites.some((fav) => fav.id === product.id);

  const toggleFavorite = () => {
    if (!product) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.info("Removed from favorites");
    } else {
      dispatch(addToFavorites(product));
      toast.success("Added to favorites");
    }
  };

  if (loader) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>
      <h3>{product.title}</h3>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove" : "Added"}
      </button>
    </div>
      </div>
      
    );
  }

  if (error || !product) {
    return <h2>Error loading product details</h2>;
  }

  return (
    <div className="card mt-5 m-auto" style={{ width: "18rem" }}>
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>
        <button
          className={`btn mt-2 ${isFavorite ? "btn-danger" : "btn-warning"}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
