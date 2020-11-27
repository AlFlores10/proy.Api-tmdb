import React, { Component, Fragment } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topRatedFilms: []
        }
    };


    async componentDidMount() {
        try {
            const peticionFilms = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b5138e06a3a9125b8c326498bbeae997&language=en-US&page=1');
            this.setState({ topRatedFilms: peticionFilms.data.results });
            console.log(this.state.topRatedFilms);

        } catch (error) {
            console.log(error);
        }
    };


    // NO MUESTRA LA IMAGEN DE LA PELICULA
    muestraResultados() {
        if(this.state.topRatedFilms[0]) {
            return (
                this.state.topRatedFilms.map(film => {
                    return (
                        <div className="film" key={ film.id }>
                            {film.title}
                            {film.vote_average} 
                            <img alt={film.title} src={film.poster_path}></img>

                        </div>
                    )
                })
            )
        } else {
            return (
                <div> CARGANDO LOS DATOS...</div>
            )
        }
    };


    render() {
        return (
            <Fragment>
                { this.muestraResultados() }
            </Fragment>
        )
    };
};

export default Home;