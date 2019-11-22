import React, { Component } from 'react';

// El consumer se usara donde se necesite acceder a los datos
import { CategoriasConsumer } from '../context/CategoriasContext';
import { EventosConsumer } from '../context/EventosContext';


export class Formulario extends Component {
    state = {
        nombre: '',
        categoria: ''
    }

    // Si el usuario selecciona un evento o categoria
    obtenerDatosEvento = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <EventosConsumer>
                {(value) => {
                    // console.log(value);
                    
                    return (
                        // La function obtenerEventos se pasara en el submit del formulario con el state 
                        // Consultara la APII en el context de eventos y mostrara los resultados
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                value.obtenerEventos(this.state)
                            }}
                        >
                            <fieldset className='uk-fieldset uk-margin'>
                                <legend className='uk-legend uk-text-center'>
                                    Busca tu evento por nombre o categoria
                                </legend>
                            </fieldset>

                            <div className='uk-column-1-3@m uk-margin'>
                                <div className='uk-margin' uk-margin='true'>
                                    <input 
                                        name='nombre'
                                        className='uk-input'
                                        type='text'
                                        placeholder='Nombre de Evento o Ciudad'
                                        onChange={this.obtenerDatosEvento}
                                    />
                                </div>

                                <div className='uk-margin' uk-margin='true'>
                                    <select
                                        className='uk-select'
                                        name='categoria'
                                        onChange={this.obtenerDatosEvento}
                                    >
                                        <option value=''>Seleccionar categoria</option>
                                        {/* Dentro del componente se tendra acceso a la informacion enviada desde el provider */}
                                        <CategoriasConsumer>
                                            {/* Al value se accede mediante un arrow function */}
                                            {(value) => {
                                                
                                                return (
                                                    value.categorias.map(categoria => (
                                                        <option key={categoria.id} value={categoria.id} data-uk-form-select>
                                                            {categoria.name_localized}
                                                        </option>
                                                    ))
                                                )                                  
                                            }}
                                        </CategoriasConsumer>
                                    </select>
                                </div>

                                <div>
                                    <input 
                                        type='submit' 
                                        className='uk-button uk-button-danger' 
                                        value='Buscar Eventos' 
                                    />
                                </div>
                            </div>

                        </form>)
                }}
            </EventosConsumer>
        )
    }
}

export default Formulario
