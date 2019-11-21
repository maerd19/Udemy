import React, { Fragment } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

import CategoriasProvider from './context/CategoriasContext';

function App() {
  return (
    // El componente que esta dentro de un provider tendra acceso a los valores definidos dentro de este
    <CategoriasProvider>
      <Header />

      <div className='uk-container'>
        {/* Desde Fromulario no se envia informacion por medio de props sino que se envia todo desde el context y consumer */}
        <Formulario />
      </div>
    </CategoriasProvider>
  );
}

export default App;
