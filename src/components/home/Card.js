import React from "react";
import { Link } from "react-router-dom";
import imageR from "../../default.jpg";
import "./Card.css";

const Card = ({ show }) => {
  return (
    <>
      <div className="card rounded-3 overflow-hidden">
        <span
          style={{
            position: "absolute",
            width: "15px",
            height: "15px",
            right: "10px",
            top: "10px",
            borderRadius: "100%",
            backgroundColor: show.status === "Running" ? "green" : "red",
          }}
        ></span>
        <img src={show.image?.medium ?? imageR} alt="" className="card-img" />
        <div
          className="card-img-overlay text-light p-0"
          style={{
            backgroundImage: "linear-gradient(#e4e9e400, #000000c9, #000000)",
          }}
        >
          <div
            style={{ position: "absolute", bottom: "0px" }}
            className="cardEffect w-100 p-1 pt-3 rounded-3"
          >
            <div className="mb-1 text-center">
              <h5>{show.name}</h5>
            </div>
            <p
              style={{
                color: "lightgrey",
                fontSize: "13px",
                display: "inline-block",
              }}
            >
              Ratings {show.rating.average ?? "N/A"}
            </p>
            <Link
              className="btn btn-sm"
              style={{
                float: "right",
                color: "black",
                backgroundColor: "white",
                border: "none",
              }}
              to={`/summary/${show.id}`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
