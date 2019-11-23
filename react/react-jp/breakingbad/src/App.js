import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Frase from './components/Frase';

function App() {
  const [ frase, obtenerFrase ] = useState({});

  const consultarAPI = async () => {
    const resultado = await axios(`https://breaking-bad-quotes.herokuapp.com/v1/quotes`);
    
    // Agregar el resultado de la API al State
    obtenerFrase(resultado.data[0]);
  } 

  // consulta a una REST API
  useEffect(
    () => {
      consultarAPI();
    }, []
  )
  return (
    <div className="contenedor">
      <Frase 
        frase={frase}
      />

      <button
        onClick={consultarAPI}
      >Generar Nueva</button>
    </div>
  );
}

export default App;
