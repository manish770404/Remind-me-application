import React, { useState, useEffect } from "react";
import "./showKeeper.css";

const ShowKeeper = ({flag  , setFlag}) => {
  const [keepers, setKeepers] = useState([]);

  // Fetch keepers from the backend
     
  useEffect(() => {
    fetch("http://localhost:3001/api/getAll")
      .then((res) => res.json())
      .then((data) => setKeepers(data))
      .catch((err) => console.error("Error fetching keepers:", err));
      console.log("Referteshiong it ....")
  }, [keepers,flag]);

  // Delete a keeper
  const deleteKeeper = (id) => {
    fetch("http://localhost:3001/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.text();
      })
      .then(() => {
        // Update the local state to reflect deletion
        setKeepers((prevKeepers) => prevKeepers.filter((keeper) => keeper._id !== id));
      })
      .catch((err) => console.error("Error deleting keeper:", err));

    //   setFlag(()=> !flag)
  };

  return (
    <div className="showkeeper row">
      {keepers.map((keeper) => (
        <div className="keeperCard col-md-3" key={keeper._id}>
          <h1>
            {keeper.title}{" "}
            <i
              className="deleteIcon fa-solid fa-trash"
              onClick={() => deleteKeeper(keeper._id)}
              style={{ cursor: "pointer", color: "red" }}
            ></i>
          </h1>
          <textarea
            className="descriptionBox"
            value={keeper.description}
            readOnly
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default ShowKeeper;
