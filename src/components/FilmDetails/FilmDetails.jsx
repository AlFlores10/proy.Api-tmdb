import React, {Component} from 'react';

import './FilmDetails.css';

class FilmDetails extends Component {
    constructor(props) {
        super(props);
        
        this.setState = {
            filmEscogido : {}
        }
    };

    componentDidMount() {
        let seleccionFilm = JSON.parse(localStorage.getItem('datosPelicula'));
        this.setState({filmEscogido : seleccionFilm});  
        console.log(seleccionFilm);
    };


    btnAtras() {
        this.props.history.push('/');
    };


    mostrarDatos() {
        if(this.state.filmEscogido?.id) {
            return (
                <div>
                    <div>Titulo: {this.state.filmEscogido.title}</div>
                    <div>Puntuacion Media: {this.state.filmEscogido.vote_average}</div>
                    <div>Estreno: {this.state.filmEscogido.release_date}</div>
                    <div>Sinopsis: {this.state.filmEscogido.overview}</div>
                </div>
            )
        } else {
            return (
                <div>CARGANDO LOS DATOS DE LA PELICULA...</div>
            )
        }
    };


    render() {
        return(
            <div>
                {this.mostrarDatos()}
                <button onClick={() => this.btnAtras()}> VOLVER A PAGINA PRINCIPAL</button>
            </div>
        )
    };
};

export default FilmDetails;