import React, { Component } from 'react';
import axios from 'axios';

// Se recomienda usar el context en un proyecto grande ya que es mucha configuracion para un proyecto chico

// 1. Crear el context
const CategoriasContext = React.createContext();

// 3. Crear Consumer y exportarlo en los componentes que lo necesiten
// Variable que es un apuntador a CategoriasContext.Consumer.
// Esta variable es mas facil de leer que CategoriasContext.Consumer
export const CategoriasConsumer = CategoriasContext.Consumer;

// 2. Crear Provider
export class CategoriasProvider extends Component {
    token = 'NNBV2Y7KFTJVQKLBJ3JD';
    
    state = {
        // Lo que se almacene en este state sera el resultado de la consulta
        categorias : []
    }

    componentDidMount() {
        this.obtenerCategorias();
    }

    obtenerCategorias = async () => {
        let url = `https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;

        let categorias = await axios.get(url);

        this.setState({
            categorias : categorias.data.categories
        })  
    }

    render() {
        return (
            // 4. Exportar Provider
            // Aqui se define el state inicial y desde aqui salen los datos
            <CategoriasContext.Provider
                value={{
                    categorias : this.state.categorias
                    // En algunos casos es correcto agregar multiples propiedades a un objeto del context.
                    // Sobre todo una funcion porque esta puede cambiar los valores del state.
                    // El problema llega con los eventos ya que si estos se pasan como parte del provider y 
                    // usuario haga una busqueda por dichos eventos la lista del valor se recargara
                    // Es por eso que conviene mas crear otro context
                }}
            >
                {this.props.children}
            </CategoriasContext.Provider>
        )
    }
}

export default CategoriasProvider
