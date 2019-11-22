import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaEventos from './components/ListaEventos';

import CategoriasProvider from './context/CategoriasContext';
import EventosProvider from './context/EventosContext';

function App() {
  return (
    // El componente que esta dentro de un provider tendra acceso a los valores definidos dentro de este
    // Se recomienda rodear con los providers todos los componentes aunque estos no hagan uso de la informacion contenida en los providers
    <EventosProvider>
      <CategoriasProvider>
        <Header />

        <div className='uk-container'>
          {/* Desde Fromulario no se envia informacion por medio de props sino que se envia todo desde el context */}
          {/* El formulario tiene acceso a los eventos y categorias del provider */}
          <Formulario />

          <ListaEventos />
        </div>
      </CategoriasProvider>
    </EventosProvider>
  );
}

export default App;
