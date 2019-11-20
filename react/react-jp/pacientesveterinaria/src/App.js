import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  state = {
    // En este arreglo se almacenaran todas las citas que se generan desde el componente NuevaCita
    citas: []
  }

  // Cuando la aplicacion carga
  // Una vez que la aplicacion carga se leeran los datos del local storage
  // Si existe algo en el storage se coloca en el state
  componentDidMount() {
    // getItem es el metodo usado para tomar los items del localStorage
    const citasLS = localStorage.getItem('citas');
    // Si existe algo en localStorage se convierte la cadena en un arreglo de objetos y se coloca en el state
    if(citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  // Cuando agregamos o eliminamos una nueva cita
  componentDidUpdate() {
    // localStorage no soporta arreglos, solo Strings por lo que el arreglo se puede convertir con stringify
    localStorage.setItem('citas', JSON.stringify(this.state.citas))
  }

  // Del hijo al padre se pueden pasar datos si utilizas una funcion que toma un dato para utilizarse en el hijo
  crearNuevaCita = datos => {
    // copiar el state actual
    // La sig. sintaxis es similar a hacer push a un arreglo
    const citas = [...this.state.citas, datos];

    // agregar el nuevo state
    this.setState({
      citas
    })
  }

  // Elimina las citas del state
  eliminarCita = id => {
    // tomar una copia del state
    // El state nunca debe de mutarse directamente, por eso la copia
    const citasActuales = [...this.state.citas];

    // utilizar filter para sacar el elemento @is del arreglo
    const citas = citasActuales.filter(cita  => cita.id !== id)

    // actualizar el state
    this.setState({
      citas
    })
  }

  render() {
    return( 
      <div className="container">
        <Header 
          titulo='Administrador Pacientes Veterinaria'
        />

        <div className='row'>
          <div className="col-md-10 mx-auto">
            <NuevaCita 
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>

          <div className='mt-5 col-md-10 mx-auto'>
            <ListaCitas 
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>
      </div>      
     )
  }
}

export default App;
