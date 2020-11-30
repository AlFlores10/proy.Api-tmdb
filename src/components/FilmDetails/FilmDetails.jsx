import React, { Component } from 'react';

import './FilmDetails.css';

class FilmDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filmEscogido: {}
        }
    };

    componentDidMount() {
        let seleccionFilm = JSON.parse(localStorage.getItem('datosPelicula'));
        this.setState({ filmEscogido: seleccionFilm });
        console.log(seleccionFilm);
    };


    btnAtras() {
        this.props.history.push('/');
    };


    mostrarDatos() {
        if (this.state.filmEscogido?.id) {
            return (
                <div className="film-details" key={this.state.filmEscogido.title}>
                    <img alt={this.state.filmEscogido.title} src={`https://image.tmdb.org/t/p/w300${this.state.filmEscogido.poster_path}`}></img>
                    <div className="title">Titulo: {this.state.filmEscogido.title}</div>
                    <div className="vote">Puntuacion Media: {this.state.filmEscogido.vote_average}</div>
                    <div className="date">Estreno: {this.state.filmEscogido.release_date}</div>
                    <div className="overview">Sinopsis: {this.state.filmEscogido.overview}</div>
                </div>
            )
        } else {
            return (
                <div>CARGANDO LOS DATOS DE LA PELICULA...</div>
            )
        }
    };


    render() {
        return (
            <div className="container-film-details">
                {this.mostrarDatos()}
                <button onClick={() => this.btnAtras()}> VOLVER A PAGINA PRINCIPAL</button>
            </div>
        )
    };
};

export default FilmDetails;