// Cuando el usuario haga una busqueda por nuevos eventos se recargara solo este context
import React, { Component } from 'react';
import axios from 'axios';

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {
    token = 'NNBV2Y7KFTJVQKLBJ3JD';
    ordenar = 'date'

    state = {
        eventos : []
    }

    // La diferencia entre este context y el de categorias es que el primero se ejecutara manualmente con cada llamada del usuario 
    // y el segundo se ejecuta automaticamente en cada llamada al metodo componentDidMount()

    // Esta funcion toma una busqueda del usuario
    obtenerEventos = async (busqueda) => {
        let url = `https://cors-anywhere.herokuapp.com/http://eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&categories=${busqueda.categoria}&sort_by=${this.ordenar}&token=${this.token}&locale=es_ES`
        // let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;


        // consultar la API con la URL
        const eventos = await axios(url);

        this.setState({
            eventos : eventos.data.events
        })
        
    }
    render() {
        return (
            <EventosContext.Provider
                value={{
                    eventos : this.state.eventos,
                    obtenerEventos : this.obtenerEventos
                }}
            >
                {this.props.children}
            </EventosContext.Provider>
        )
    }
}

export default EventosProvider
