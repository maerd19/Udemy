import React, { Component, Fragment } from 'react';
import Producto from './Producto';

export class ListaProductos extends Component {
    // Un state siempre debe ser un objeto
    state = {
        productos: [
            { id : 1, nombre : 'Camisa ReactJS', precio : 30 },
            { id : 2, nombre : 'Camisa VueJS', precio : 30 },
            { id : 3, nombre : 'Camisa Amgular', precio : 30 },
            { id : 4, nombre : 'Camisa node.js', precio : 35 }
        ],
        totalCarrito: 500,
        cliente: 'Juan De la torre'
    }
    // Esta es otra forma de crear un state dentro de un constructor 
    // constructor(props) {
    //     super(props)
    
    //     this.state = {
             
    //     }
    // }
    
    // Los metodos de ciclo de vida solo son accesibles en class components

    // Antes de que este listo el componente
    componentDidMount() {
        console.log(1);        
    }

    // El componente ya esta listo
    componentWillMount(){
        console.log(2);             
    }

    // El componente se actualiza
    componentWillUpdate(){
        console.log(3);        
    }

    // El componente se remueve
    componentWillUnmount(){
        console.log(4);        
    }

    render() {
        console.log(5);
        
        // Buen espacio para crear variables
        const {productos} = this.state;
        console.log(productos);
        
        return (
            <Fragment>
                <h1>Lista de Productos</h1>
                {productos.map(producto => (
                    <Producto 
                        // Cuando se itere una lista se debe de listar cada componente
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </Fragment>            
        )
    }
}

export default ListaProductos
