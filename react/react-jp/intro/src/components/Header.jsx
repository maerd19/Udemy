import React from 'react'

// Se puede aplicar destructuring en la entrada de parametros para tener mas legibilidad en el codigo
const Header = ({titulo}) => (
    <header>
        <h1>{titulo}</h1>
    </header>
)

export default Header
