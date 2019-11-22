import React from 'react'

function Error({mensaje}) {
    return (
        <div className='card-panel red daren-4 error col s12'>
            {mensaje}
        </div>
    )
}

export default Error
