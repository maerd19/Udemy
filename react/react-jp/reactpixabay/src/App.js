import React, { useState, useEffect } from 'react';

import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);


  useEffect(() => {
    const consultarAPI = async () => {

      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '14411265-4057f9c6485340d522b61adf';

      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas( calcularTotalPaginas );
      
      // Mover la pantalla hacia la parte superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView('smooth', 'start');
    }

    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    let nuevaPaginaAnterior = paginaActual - 1;

    // Colocarlo en el State
    guardarPaginaActual(nuevaPaginaAnterior);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;

    // Colocarlo en el State
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Buscador 
          guardarBusqueda={guardarBusqueda}
        />

      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null : (
          <button 
            type='button' 
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior 
          </button>
        )}

        {(paginaActual === totalPaginas) ? null : (
          <button 
            type='button' 
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
