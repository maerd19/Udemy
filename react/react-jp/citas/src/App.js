import React, { useState, useEffect, Fragment } from 'react';

function Cita({cita, idx, eliminarCita}) {
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span> </p>
      <p>Dueno: <span>{cita.propietario}</span> </p>
      <p>Fecha: <span>{cita.fecha}</span> </p>
      <p>Hora: <span>{cita.hora}</span> </p>
      <p>Sintomas: <span>{cita.sintomas}</span> </p>
      <button 
        onClick={() => eliminarCita(idx)}
        type='button' 
        className='button eliminar u-full-width'>Eliminar X</button>
    </div>
  )
}

function Formulario({crearCita}) {

  const stateInicial = {
    mascota : '',
    propietario : '',
    fecha : '',
    hora : '',
    sintomas : ''
  }

  // cita = state actual
  // actualizarCita = fn para cambiar el state
  const [cita, actualizarCita] = useState(stateInicial);

  // actualizar el state
  const actualizarState = e => {
    actualizarCita({
      // Spread operator se usa para tomar una copia del estado actual de la cita
      ...cita,
      // e.target.name sera el nombre del input donde se esta ejecutando actualizarState
      // e.target.value sera el valor que se escribio dentro del input
      [e.target.name] : e.target.value
    })
  }

  // pasamos la cita al componente principal
  const enviarCita = e => {
    e.preventDefault();

    // pasar la cita hacia el componente principal
    crearCita(cita)

    // Reinicar el state (reinicar el form)
    actualizarCita(stateInicial)
  }  

  return (
    <Fragment>
        <h2>Crear Cita</h2>

        <form onSubmit={enviarCita}>
                    <label>Nombre Mascota</label>
                    <input 
                      type="text" 
                      name="mascota"
                      className="u-full-width" 
                      placeholder="Nombre Mascota" 
                      onChange={actualizarState}
                      value={cita.mascota}
                    />

                    <label>Nombre Dueño</label>
                    <input 
                      type="text" 
                      name="propietario"
                      className="u-full-width"  
                      placeholder="Nombre Dueño de la Mascota"
                      onChange={actualizarState}
                      value={cita.propietario}
                    />

                    <label>Fecha</label>
                    <input 
                      type="date" 
                      className="u-full-width"
                      name="fecha"
                      onChange={actualizarState}
                      value={cita.fecha}
                    />               

                    <label>Hora</label>
                    <input 
                      type="time" 
                      className="u-full-width"
                      name="hora" 
                      onChange={actualizarState}
                      value={cita.hora}
                    />

                    <label>Sintomas</label>
                    <textarea 
                      className="u-full-width"
                      name="sintomas"
                      onChange={actualizarState}
                      value={cita.sintomas}
                    ></textarea>

                    <button type="submit" className="button-primary u-full-width">Agregar</button>
            </form>
    </Fragment>
  )
}

function App() {
  // Cargar las citas del localStorage como State inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // El destructuring que se hace de useState retorna 2 funciones:
  // 1. El state actual = this.state
  // 2. Funcion que actualiza el state = this.setState();
  const [citas, guardarCita] = useState(citasIniciales);

  // Lo anterior es lo mismo que:
  // state = {
  //   citas: []
  // }

  // Agregar las nuevas citas al state
  const crearCita = cita => {
    // Tomar una copia del state y agregar la nueva cita
    const nuevasCitas = [...citas, cita];
    // Almacenamos en el state global la cita que se envio desde el componente Formulario
    guardarCita(nuevasCitas);
    console.log(citas);    
  }

  // Elimina las citas del State
  const eliminarCita = idx => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(idx, 1);
    guardarCita(nuevasCitas);
  }

  // useEffect se cargara cuando el componente cargue o se actualice 
  // Osea, es el componentDidMount y/o componentDidUpdate
  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));
      // Se parsea la variable porque en el localStorage solo se pueden guardar strings
      if(citasIniciales) {
        // Se agregara al arreglo del localStorage el string de las citas que estan almacenadas en el State
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        // La primera vez que alguien visite la aplicacion se creara en localStorage un arreglo vacio
        localStorage.setItem('citas', JSON.stringify([]));
      }
        // useEffect solo se ejecutara cuando haya algun cambio en el valor citas de State
    }, [citas]
  )

  // Cargar condicionalmente un titulo
  // Object.keys(value).length nos ayuda a validar si un arreglo esta o no vacio
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar las citas aqui';

  return(
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, idx) => (
              <Cita 
                key={idx}
                // El indice se envia para implementar la funcionalidad de borrar cita
                idx={idx}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>    
  )
}

export default App;
