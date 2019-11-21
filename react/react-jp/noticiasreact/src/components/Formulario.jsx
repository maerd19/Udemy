import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Formulario extends Component {
    state = {
        // La categoria seleccionada se guardara en este state
        categoria : 'general'
    }

    // Otra forma de colocar un valor de inicio al estado seria de la sig forma
    // componentDidMount() {
    //     this.setState({
    //         categoria: 'general'
    //     })
    // }

    cambiarCategoria = e => {

        this.setState({
            categoria: e.target.value
        }, () => {
            // Pasarlo a la pagina principal
            this.props.consultarNoticias(this.state.categoria);
        }); 
    }

    render() {
        return (
            <div className='buscador row'> 
                <div className='col s12 m8 offset-m2'>
                    <form>
                        <h2>Encuentra noticias por categoria</h2>

                        <div className='input-field col s12'>
                            <select
                                onChange={this.cambiarCategoria}
                            >
                                <option value='general'>General</option>
                                <option value='business'>Negocios</option>
                                <option value='entertainment'>Entretenimiento</option>
                                <option value='health'>Salud</option>
                                <option value='science'>Ciencia</option>
                                <option value='sports'>Deportes</option>
                                <option value='technology'>Tecnologia</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

Formulario.propTypes = {
    titulo : PropTypes.string.isRequired
}

export default Formulario