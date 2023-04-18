import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Card from "./compenant/card";

function App() {
  const [beers, setBeers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const fetchBeers = async () => {
    try {
      setIsLoading(true);
      const beersArray = [];
      const numberOfBeers = 5;
      for (let i = 1; i < numberOfBeers; i++) {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers/random`
        );
        const beer = response.data[0];
        if (beer.image_url) {
          beersArray.push(beer);
        } else {
          i--;
        }
      }
      setBeers(beersArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchBeers().then(() => {
      setIsLoading(false);
      const cardContainer = document.querySelector(".card-container");
      if (cardContainer) {
        cardContainer.classList.add("loaded");
      }
    });
  }, []);

  const handleReloadClick = () => {
    console.log("handleReloadClick called");
    if (!isLoading) {
      setIsReversed((prevState) => !prevState);
      setTimeout(() => {
        fetchBeers();
      }, 600);
    }
  };
  

  return (
    <div>
      <div className="info">
        <h1 className="title">Beers</h1>
        <h4 className="text">Envie de decouvrir une bière ?</h4>
        
      </div><button className="reload" onClick={handleReloadClick} disabled={isLoading}>
          {isLoading ? "Loading..." : "Reload"}
        </button>
      <div className="card-container-wrapper">
        <div
          id="card"
          className={`card-container ${
            isLoading ? "" : isReversed ? "reverse-animate" : "animate"
          }`}
        >
          {beers
            .filter((beer) => beer.image_url)
            .map((beer) => (
              <Card key={beer.id} beer={beer} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
