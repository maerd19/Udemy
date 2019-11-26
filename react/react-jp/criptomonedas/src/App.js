import React, { useState, useEffect } from 'react';
import axios from 'axios';

import imagen from './cryptomonedas.png';

import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptoMoneda ] = useState('');
  const [ cargando, guardarCargando ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async() => {
      // Si no hay moneda, no ejecutar
      if(moneda === '') return;

      const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar Spinner 
      guardarCargando(true);

      // Ocultar Spinner y agregar el resultado
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000)
      
    }

    cotizarCriptomoneda();
  }, [ moneda, criptomoneda ]);

  // Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptoMoneda={guardarCriptoMoneda}
          />

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
