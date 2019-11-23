import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  // state
  const [ presupuesto, guardarPresupuesto ] = useState(0);
  const [ restante, guardarRestante ] = useState(0);
  const [ preguntaPresupuesto, guardarPreguntaPresupuesto ] = useState(true);
  const [ crearGasto, guardarCrearGasto ] = useState(false);
  // Cada gasto va a ser un objeto
  const [ gasto, guardarGasto ] = useState({});
  // Gastos es un arreglo de objetos(gasto individual)
  const [ gastos, guardarGastos ] = useState([]);

  useEffect(() => {
    // Validar que no se agreguen gastos hasta que no se llene el formulario
    // El codigo se ejecutara solo cuando se agregue un nuevo gasto
    if(crearGasto) {
      const listadoGastos = [...gastos, gasto];
      guardarGastos(listadoGastos);

      // restar el presupuesto
      const presupuestoRestante = restante - gasto.cantidadGasto;
      guardarRestante(presupuestoRestante);

      // Una vez que se agrega, lo ponemos como false
      guardarCrearGasto(false);
    }
  }, [crearGasto, gastos, gasto, restante])

  return (
    <div className="App container">
      <header>
        <h1>Gasto Semanal</h1>
        
        <div className='contenido-principal contenido'>
          { (preguntaPresupuesto) 
            ?
                <Pregunta 
                  guardarPresupuesto = {guardarPresupuesto}
                  guardarPreguntaPresupuesto = {guardarPreguntaPresupuesto}
                  guardarRestante = {guardarRestante}
                />
            : (
                <div className='row'>
                  <div className='one-half column'>
                    <Formulario 
                      guardarGasto={guardarGasto}
                      guardarCrearGasto={guardarCrearGasto}
                    />
                  </div>

                  <div className='one-half column'>
                    <Listado 
                      gastos={gastos}
                    />

                    <ControlPresupuesto 
                      presupuesto={presupuesto}
                      restante={restante}
                    />
                  </div>
                </div>
              )
          }
        </div>        
      </header>
    </div>
  );
}

export default App;
