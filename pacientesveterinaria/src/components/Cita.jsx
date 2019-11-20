import React from 'react'

const Cita = ({cita, eliminarCita}) => (
    <div className='media mt-3'>
        <div className='media-body'>
            <h3 className='mt-0'>{cita.mascota}</h3>
            <p className='card-text'><span>Nombre Dueno: </span> {cita.propietario} </p>
            <p className='card-text'><span>Fecha: </span> {cita.fecha} </p>
            <p className='card-text'><span>Hora: </span> {cita.hora} </p>
            <p className='card-text'><span>Sintomas: </span> </p>
            <p className='card-text'>{cita.sintomas}</p>

            <button
                className='btn btn-danger'                
                // Si solo se tiene la llamada a la funcion pero sin parametro no servira
                // Si colocamos el parentesis para que la funcion reciba un parametro esta se ejecutara al momento de cargar el componente
                // Para evitar que la llamada a la funcion se ejecute hasta que sea solicitada se encierra la funcion en un arrow function
                onClick={() => eliminarCita(cita.id)}
            >Borrar &times;</button>
        </div>
    </div>
);

export default Cita
