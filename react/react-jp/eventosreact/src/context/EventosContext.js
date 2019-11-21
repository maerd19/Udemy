// Cuando el usuario haga una busqueda por nuevos eventos se recargara solo este context
import React, { Component } from 'react';

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {
    token = 'BICX7YXKJODJJYN4LTGB';
    ordenar = 'date'

    state = {}

    // Esta funcion toma una busqueda del usuario
    obtenerEventos = async (busqueda) => {
        let url = `https://eventbriteapiv3.com/v3/events/search/?q=${busqueda.nombre}&categories=${busqueda.categoria}&sort_by=${this.ordenar}&token=${this.token}&locale=es_ES`
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default EventosProvider
