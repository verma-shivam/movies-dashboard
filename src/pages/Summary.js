import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import imageR from "../default.jpg";
import Pill from "../components/summary/Pill";

const Summary = () => {
  const { id } = useParams();

  const closeRef = useRef(null);
  const nameRef = useRef(null);
  const numberOfMembersRef = useRef(null);
  const [show, setShow] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = async () => {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    setShow(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const getYear = (date) => {
    const dates = new Date(date);
    return dates.getFullYear();
  };

  const bookingConfirmation = () => {
    const userName = nameRef.current.value;
    const numberOfMembers = numberOfMembersRef.current.value;

    if (!userName || !numberOfMembers) return;

    alert(
      `Booking Confirmed!!\nBooked by Name: ${userName}\nNumber of Seats Booked: ${numberOfMembers}`
    );

    closeRef.current.click();
  };

  if (isLoading) {
    return (
      <>
        <h4 className="text-center mt-5">Loading data....</h4>
      </>
    );
  }

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
        <div className="row m-0 p-0 h-100">
          {/* left section for image */}
          <div
            style={{ height: "100vh" }}
            className="col-md-4 d-flex flex-column align-items-center justify-content-center"
          >
            <img
              className="w-75 rounded-3 images"
              src={show.image?.original ?? imageR}
              alt=""
            />
          </div>
          {/* right section for show details */}
          <div className="col-md-8 pt-5">
            <div style={{ position: "relative" }}>
              {/* header */}
              <div
                style={{ position: "absolute", width: "100%" }}
                className="w-75 d-flex justify-content-end"
              >
                <button
                  type="button"
                  className="btn btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#booking"
                  style={{ backgroundColor: "#a2a2b09e", color: "white" }}
                >
                  Book Now
                </button>
              </div>
              <h3 className="text-light text-uppercase title">{show.name}</h3>
              {/* Details */}
              <h6 className="text-light">Language{"   "}</h6>
              <Pill title={show.language} />

              <div className="d-flex gap-4">
                <div>
                  <h6 className="text-light mt-2">Status</h6>
                  <Pill
                    title={show.status}
                    bgColor={show.status === "Running" ? "green" : "red"}
                  />
                </div>
                <div>
                  <h6 className="text-light mt-2">Show Type</h6>
                  <Pill title={show.type} />
                </div>
              </div>

              {/* --Details Ends */}
              {/* Summary Starts */}
              <h6 className="text-light mt-2">Summary</h6>
              <p
                className="w-75"
                style={{ color: "#b3b1b1", marginBottom: "30px" }}
                dangerouslySetInnerHTML={{ __html: show.summary }}
              ></p>
              {/* --Summary Ends */}

              {/* Info Section */}
              <div
                className="rounded-3 w-75"
                style={{
                  padding: "1rem 2rem",
                  backdropFilter: "contrast(0.8)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-20px",
                    color: "white",
                    backgroundColor: "#191919",
                    left: "10px",
                  }}
                  className="px-3 rounded-2"
                >
                  Show Info
                </span>
                <div className="mt-2">
                  <h6 className="text-light">Official Site</h6>
                  <a
                    href={show.officialSite}
                    target="_blank"
                    style={{ textDecoration: "none", color: "yellow" }}
                  >
                    {show.officialSite}
                  </a>
                </div>
                <div className="mt-2">
                  <h6 className="text-light">Network</h6>
                  <a
                    href={show.network.officialSite}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Pill
                      title={`${show.network.name} (${getYear(
                        show.premiered
                      )}-${show.ended ? getYear(show.ended) : "now"})`}
                    />
                  </a>
                </div>
                <div className="mt-2">
                  <h6 className="text-light">Genres</h6>
                  <div className="d-flex gap-2">
                    {show.genres.map((genre) => (
                      <Pill title={genre} />
                    ))}
                  </div>
                </div>

                <div className="mt-2 d-flex gap-5">
                  <div>
                    <h6 className="text-light">Schedule days</h6>
                    <div className="d-flex gap-2">
                      {show.schedule.days.map((day) => (
                        <Pill title={day} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="text-light">Timings & Duration</h6>
                    <p className="text-light">
                      At {show.schedule.time} ({show.runtime} minutes)
                    </p>
                  </div>
                </div>
              </div>
              {/* --Info Section ends */}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <div
        className="modal fade"
        id="booking"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="bookingLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="bookingLabel">
                Booking Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="show_name">Show Name</label>
                <input
                  type="text"
                  name="showName"
                  id="show_name"
                  className="form-control"
                  value={show.name}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="show_time">Show Time</label>
                <input
                  type="text"
                  name="showTime"
                  id="show_time"
                  className="form-control"
                  value={show.schedule.time}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="user_name">User Name</label>
                <input
                  type="text"
                  name="userName"
                  id="user_name"
                  className="form-control"
                  ref={nameRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="user_count">Number of Members</label>
                <input
                  type="number"
                  name="userMembers"
                  id="user_count"
                  className="form-control"
                  min={1}
                  ref={numberOfMembersRef}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={bookingConfirmation}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
