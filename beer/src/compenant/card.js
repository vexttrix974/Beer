import React, { useState, useEffect } from "react";
import "../index.css";

function Card({ beer, handleCardHoverEnter }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (beer) {
      setIsLoading(false);
      setTimeout(() => {
        setIsLoaded(true);
      }, 600);
    }
  }, [beer]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const containerClasses = `card-container ${
    isLoading ? "loading" : ""
  } ${isLoaded ? "loaded card-fade-in" : ""}`;

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleCardHoverEnter}
    >
      <div className={containerClasses}>
        <div className="card-front">
          {beer?.name && <p className="name">{beer.name}</p>}
          {beer?.image_url && (
            <img src={beer.image_url} alt={beer.name} className="beer-image" />
          )}
          {beer?.tagline && <p className="style">{beer.tagline}</p>}
        </div>
        <div className="card-back">
          {beer?.abv && (
            <p className="abv">ABV:{beer.abv}</p>
          )}
          {beer?.ibu && (
            <p className="ibu">IBU:{beer.ibu}</p>
          )}
          {beer?.description && (
            <p className="description">{beer.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
