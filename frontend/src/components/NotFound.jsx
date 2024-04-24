import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="not-found" role="main">
      <h1>404</h1>
      <p>Parece que ha habido un error para encontrar la página, por favor pulse en el siguiente enlace para volver a la página principal: </p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;