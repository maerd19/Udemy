import React, { Fragment, Component } from 'react';
// import PrimerComponente from './components/PrimerComponente';
import Header from './components/Header';
import Footer from './components/Footer';
import ListaProductos from './components/ListaProductos';

// Ventajas de usar Fragment

// 1. Es un poco más rápido y tiene menos uso de memoria (no es necesario crear un nodo DOM adicional). 
// Esto solo tiene un beneficio real en árboles muy grandes y / o profundos, pero el rendimiento de la 
// aplicación a menudo muere por mil cortes. Este es un corte menos.

// 2. Algunos mecanismos CSS como Flexbox y CSS Grid tienen una relación padre-hijo especial, y agregar 
// divs en el medio hace que sea difícil mantener el diseño deseado mientras se extraen los componentes 
// lógicos.

// 3. El inspector DOM está menos desordenado

// Class Component
class App extends Component {
  // El unico metodo obligatorio de un class component es render
  render(){
    const fecha = new Date().getFullYear();

    return (
      // <PrimerComponente />
      <Fragment>
        <Header
        // Los props siempre se pasan de padre a hijo
          titulo='Tienda Virtual'
        />

        <ListaProductos />

        <Footer 
          fecha={fecha}
        />
      </Fragment>
    );
  }  
}

// Functional Component
// const PrimerComponente = () => (<h1>Hola Mundo</h1>);

export default App;
