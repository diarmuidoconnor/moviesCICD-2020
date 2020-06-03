
import React, { useEffect, useState } from "react";

const MoviePage = props => {
  const { id } = props.match.params;
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      ).then(res => res.json())
      .then(data => {
      setData(data);
    });
  }, [id]);
  return (
    <>
    {JSON.stringify(data)}
 
  </>
  );
};

export default MoviePage;
