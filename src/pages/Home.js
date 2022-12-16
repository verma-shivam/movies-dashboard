import React, { useEffect, useState } from "react";
import Card from "../components/home/Card";

const Home = () => {
  const [showsList, setShowsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const data = await response.json();
    setShowsList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (showsList.length === 0 || isLoading) {
    return (
      <>
        <h4 className="text-center mt-5">Loading shows on the board!!......</h4>
      </>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h3 className="text-center mb-5">Shows on the board</h3>
          {showsList.map((showDetails) => (
            <div className="col-md-3 mb-4">
              <Card show={showDetails.show} key={showDetails.show.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
