import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Formulario({guardarMoneda, guardarCriptoMoneda}) {
    const [ criptomonedas, guardarCriptomonedas ] = useState([]);
    const [ monedaCotizar, guardarMonedaCotizar ] = useState('');
    const [ criptoCotizar, guardarCriptoCotizar ] = useState('');
    const [ error, guardarError ] = useState(false);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=15&tsym=USD';

            const resultado = await axios.get(url);

            // Colocar respuesta en el State
            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    // Validar que el usuario llene ambos campos
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if(monedaCotizar === '' || criptoCotizar === '') {
            guardarError(true);
            return;
        }

        // Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCriptoMoneda(criptoCotizar);

    }

    // Mostrar el error en caso de que exista
    const componente = (error) ? <Error mensaje='Ambos campos son obligatorios' /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label htmlFor="">Elige tu moneda</label>
                <select 
                    className='u-full-width'
                    onChange={ e => guardarMonedaCotizar(e.target.value) }
                >
                    <option value="">Elige tu moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label htmlFor="">Elige tu criptomoneda</label>
                <select
                    className='u-full-width'
                    onChange={ e => guardarCriptoCotizar(e.target.value) }
                >
                    <option value="">Elige tu Criptomoneda</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>

            <input type="Submit" className="button-primary u-full-width" value='Calcular' />

        </form>
    )
}

export default Formulario
