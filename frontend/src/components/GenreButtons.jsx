import React from "react";
import { genreData } from "../config/GenreConfig.jsx";

const GenreButtons = ({ onGenreClick }) => {
  return (
    <div className="genre-section">
      {Object.entries(genreData).map(([id, { name, icon, color }]) => (
        <button
          key={id}
          className="genre-buttons"
          style={{
            backgroundColor: color,
          }}
          onClick={() => onGenreClick(id)}
        >
          {icon} {name}
        </button>
      ))}
    </div>
  );
};
export default GenreButtons;
