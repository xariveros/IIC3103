import React from "react";
import { Link } from "react-router-dom";
// import InfoEpisodio from './InfoEpisodio'

const Episodio = ({ info }) => {
  return (
    <div>
      {info.map(info => (
        <div>
          <Link to={"/" + info.id}>
            <h1>
              <p>Nombre del episodio: {info.name}</p>
            </h1>
          </Link>
          <li>Fecha de emisión: {info.air_date}</li>
          <li>ID: {info.id}</li>
        </div>
      ))}
    </div>
  );
};

export default Episodio;
