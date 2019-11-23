import React, { useState, useEffect } from 'react';
// Los lifecycle functions ya no existen en hooks. En su lugar se utiliza useEffect
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // State principal
  // ciudad = state, guardarCiudad = this.setState()
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ]= useState('');
  // Cuando la aplicacion carga por 1ra vez no hay errores por ello el state inicial es false
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({})

  useEffect(() => {  
  // prevenir ejecucion
  if(ciudad === '') return;

  const consultarAPI = async () => {
    const appId = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // consultar la URL
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    guardarResultado(resultado);
  }

  consultarAPI();
  // Entre la llave y el parentesis se coloca un arreglo de dependencias para determinar 
  // que parte del state debe escuchar useEffect para ejecutarse
  // Si hay una modificacion en ciudad o pais se ejecutara una funcion establecida dentro
  // del arrow function del useEffect
  }, [ ciudad, pais ]);

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
  // componente = (error) ? <Error mensaje='Ambos campos son obligatorios'/> : null
  if(error) {
    // Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios'/>
  } else if(resultado.cod === '404') {
    componente = <Error mensaje='La ciudad no existe en nuestro registro'/>
  } else {
    // Mostrar el clima 
    componente = <Clima 
                   resultado = {resultado}
                 />
  }

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
