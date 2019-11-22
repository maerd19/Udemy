import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';

function App() {

  // State principal
  // ciudad = state, guardarCiudad = this.setState()
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ]= useState('');
  // Cuando la aplicacion carga por 1ra vez no hay errores
  const [ error, guardarError ] = useState(false);

  const datosConsulta = datos => {
    // Validar que ambos campos esten 
    if(datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }

    // Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  // Cargar un componente condicionalmente
  let componente;
  componente = (error) ? <Error mensaje='Ambos campos son obligatorios'/> : null
  // if(error) {
  //   // Hay un error, mostrarlo
  //   componente = <Error mensaje='Ambos campos son obligatorios'/>
  // } else {
  //   // Mostrar el clima 
  //   componente= null
  // }

  return (
    <div className='App'>
      <Header 
        titulo='Clima React App'
      />
      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col s12 m6'>
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>

            <div className='col s12 m6'>
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
