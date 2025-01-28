import React from "react";

import Lottie from "lottie-react";
import loadingMovieRoll from "../assets/movie.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={loadingMovieRoll}
        loop={true}
        style={{ width: "180px", height: "180px" }}
      />
    </div>
  );
};
export default Loader;
