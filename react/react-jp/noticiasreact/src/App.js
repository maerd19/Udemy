import React, { Component, Fragment } from 'react'
import Header from './components/Header';
import ListaNoticias from './components/ListaNoticias';

class App extends Component {
  state = { 
    noticias: [] 
  }

  // Usualmente es recomendado que el llamado a una API se haga en el metodo del ciclo de vida componentDidMount
  // Que es cuando el documento esta listo
  componentDidMount() {
    this.consultarNoticias();
  }

  consultarNoticias = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=7903c60ef84e4129ae15d071e3560fb0`;

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
          <ListaNoticias 
            noticias={this.state.noticias}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
