import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Productos from './components/Productos';
import Producto from './components/Producto';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';

function App() {

  const [ productos, guardarProductos ] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      // Consultar api de json-server
      const resultado = await axios.get('http://localhost:4000/restaurant');
      
      guardarProductos(resultado.data);
    }
    consultarApi();
  }, [])

  return (
    <Router>
      {/* Lo que se coloque entre Router y Switch se mostrara en todas las paginas */}
      <Header />
      <main className="container mt-5">
        <Switch>
          {/* Cada uno de los componentes tendra una ruta */}
          {/* Es importante el orden de las rutas ya que react-router-dom evalua de arriba a abajo */}
          {/* Los componentes mas especificos deberan ir primero y los mas genericos al final */}

          {/* Para pasar props en routing se utiliza la propiedad render */}
          <Route 
            exact path='/productos'
            render={ () => (
              <Productos
                productos={productos}
              />
            ) } 
          />
          {/* Cuando no se pasan props se utiliza component */}
          <Route exact path='/nuevo-producto' component={AgregarProducto} />
          <Route exact path='/productos/:id' component={Producto} />
          <Route exact path='/productos/editar/:id' component={EditarProducto} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
    </Router>
  );
}

export default App;
