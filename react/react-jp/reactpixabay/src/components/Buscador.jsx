import React, { useState } from 'react'
import Error from './Error';

function Buscador({guardarBusqueda}) {

    const [ terminoBusqueda, guardarTerminoBusqueda ] = useState('');
    const [ error, guardarError ] = useState(false);

    const buscarImagen = e => {
        e.preventDefault();

        // Validar
        if(terminoBusqueda === '') {
            guardarError(true);
            return;
        }

        // Enviar el termino hacia el componente principal
        guardarError(false);
        guardarBusqueda(terminoBusqueda);
    }

    return (
        <form
            onSubmit={buscarImagen}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder='Busca una imagen, ejemplo: Futbol o Cafe'
                        onChange={ e => guardarTerminoBusqueda(e.target.value) } 
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block"
                        placeholder='Busca'
                    />
                </div>
            </div>

            {(error) ? <Error mensaje='Agrega un termino de busqueda' /> : null}
        </form>
    )
}

export default Buscador;
