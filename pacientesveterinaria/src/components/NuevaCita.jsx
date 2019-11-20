import React, { Component } from 'react'
// Libreria para generar id's unicos en caso de no tener acceso a una BD's
import uuid from 'uuid';

const stateInicial = {
    // Los nombres de los inputs deben ser iguales a los que forman parte del state
    cita: {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    },
    // El valor inicial arranca sin errores
    error: false
}

class NuevaCita extends Component {
    state = { ...stateInicial }

    // Metodo cuando el usuario escribe en los inputs
    // Para saber en que elemento te encuentras y que estas escribiendo se pasa un parametro y se accede a sus propiedades
    handleChange = e => {
        console.log(`${e.target.name} : ${e.target.value}`);    
        // colocar lo que el usuario escribe en el state
        this.setState({
            cita: {
                // El spread operator toma una copia del estado para evitar perder los estados restantes cuando hay uno que se este modificando
                ...this.state.cita,
                // Para mapear en cada llave del objeto "cita" se utiliza la siguiente sintaxis
                [e.target.name] : e.target.value
            }
        })
    }

    // Metodo cuando el usuario envia el formulario
    handleSubmit = e => {
        e.preventDefault();

        // extraer los valores del state
        const {mascota, propietario, fecha, hora, sintomas} = this.state.cita;

        // validar que todos los campos esten llenos
        if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
            // Los valores del state SIEMPRE se tienen que cambiar con setState y no directamente
            this.setState({
                error: true
            });

            // detener la ejecucion
            return;
        }

        // generar objeto con los datos
        // Se genera una copia del state
        const nuevaCita = {...this.state.cita};
        // Se agrega a la copia un nuevo id 
        nuevaCita.id = uuid();

        // Agregar la cita al state de App
        // A traves de esta funcion se envian los valores del state al componente padre
        // this.props.crearNuevaCita(this.state.cita)
        // Se pasa como referencia la variable que almacena los valores del estado mas el ID
        this.props.crearNuevaCita(nuevaCita);

        // Colocar en el state el state Inicial
        this.setState({
            ...stateInicial
        })
    }

    render() {

        // extraer valor del state
        const { error } = this.state;
        return (
            <div className='card mt-5 py-5'>
                <div className='card-body'>
                    <h2 className='card-title text-center mb-5'>
                        Llena el formulario para crear una nueva cita
                    </h2>

                    {/* Si hay un cambio en el state se vuelve a ejecutar el codigo */}
                    {error ? <div className='alert alert-danger mt-2 mb-5 text-center'>Todos los campos son obligatorios</div> : null}

                    {/* Los form en react no tienen action ni method */}
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group row">
                            <label className='col-sm-4 col-lg-2 col-form-label'>Nombre Mascota</label>
                            <div className='col-sm-8 col-lg-10'>
                                <input 
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre Mascota'
                                    name='mascota'
                                    // Este metodo se ejecutara cuando el usuario este cambiando el valor del input
                                    onChange={this.handleChange}
                                    // En value se colocara el elemento del estado al que corresponda este campo
                                    value={this.state.cita.mascota}
                                />
                            </div>
                        </div> {/* form-group */}

                        <div className="form-group row">
                            <label className='col-sm-4 col-lg-2 col-form-label'>Nombre Dueno</label>
                            <div className='col-sm-8 col-lg-10'>
                                <input 
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre Dueno Mascota'
                                    name='propietario'
                                    onChange={this.handleChange}
                                    value={this.state.cita.propietario}
                                />
                            </div>
                        </div> {/* form-group */}

                        <div className="form-group row">
                            <label className='col-sm-4 col-lg-2 col-form-label'>Fecha</label>
                            <div className='col-sm-8 col-lg-4'>
                                <input 
                                    type='date'
                                    className='form-control'
                                    name='fecha'
                                    onChange={this.handleChange}
                                    value={this.state.cita.fecha}
                                />
                            </div>

                            <label className='col-sm-4 col-lg-2 col-form-label'>Hora</label>
                            <div className='col-sm-8 col-lg-4'>
                                <input 
                                    type='time'
                                    className='form-control'
                                    placeholder='Nombre Mascota'
                                    name='hora'
                                    onChange={this.handleChange}
                                    value={this.state.cita.hora}
                                />
                            </div>
                        </div> {/* form-group */}

                        <div className="form-group row">
                            <label className='col-sm-4 col-lg-2 col-form-label'>Sintomas</label>
                            <div className='col-sm-8 col-lg-10'>
                                <textarea
                                    className='form-control'
                                    name='sintomas'
                                    placeholder='Describe los sintomas'
                                    onChange={this.handleChange}
                                    value={this.state.cita.sintomas}
                                >
                                </textarea>
                            </div>
                        </div> {/* form-group */}

                        <input 
                            type='submit'
                            className='py-3 mt-2 btn btn-success btn-block'
                            value='Agregar Nueva Cita'
                        />

                    </form>
                </div>
            </div>
        )
    }
}

export default NuevaCita
