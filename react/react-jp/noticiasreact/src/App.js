import React, { Component, Fragment } from 'react'
import Header from './components/Header';
import ListaNoticias from './components/ListaNoticias';
import Formulario from './components/Formulario';

class App extends Component {
  state = { 
    noticias: [] 
  }

  // Usualmente es recomendado que el llamado a una API se haga en el metodo del ciclo de vida componentDidMount
  // Que es cuando el documento esta listo
  componentDidMount() {
    this.consultarNoticias();
  }

  consultarNoticias = async (categoria = 'general') => {
    const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=`;

    const respuesta = await fetch(url);
    const noticias = await respuesta.json();

    // Las noticias recibidas a traves de la API se utilizan para llenar el state
    this.setState({
      noticias : noticias.articles
    })
  }

  render() {
    return (
      <Fragment>
        <Header 
          titulo='Noticias REACT API'
        />

        <div className='container white contenedor-noticias'>
          <Formulario 
            consultarNoticias={this.consultarNoticias}
          />

          <ListaNoticias 
            noticias={this.state.noticias}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
