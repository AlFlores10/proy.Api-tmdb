import React, { Component, Fragment } from 'react';
import './Home.css';
import axios from 'axios';
const apiKeyUser = 'b5138e06a3a9125b8c326498bbeae997';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topRatedFilms: [],
            page: 1
        }
    };


    componentDidMount() {
        this.getFilmsServices(this.state.page);
    };


    async getFilmsServices (page) {
        try {
            const peticionFilms = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyUser}&language=es-ES&page=${this.state.page}`);
            this.setState({ topRatedFilms: peticionFilms.data.results });
            console.log(this.state.topRatedFilms);

        } catch (error) {
            console.log(error);
        }
    };


    muestraResultados = () => {
        if (this.state.topRatedFilms[0]) {
            return (
                this.state.topRatedFilms.map(film => {
                    return (
                        <div className="container-film" key={film.id}>
                            {film.title}
                            <img className="img-film" onClick={() => this.clickElementoSeleccionado(film)} alt={film.title} src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}></img>
                            {/* {film.vote_average} */}

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


    clickElementoSeleccionado = (film) => {

        this.props.history.push('/film');
        localStorage.setItem('datosPelicula', JSON.stringify(film));
    };


    adelantePagina = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }), () => {
            this.componentDidMount(this.state.page)
        })
    };


    atrasPagina = () => {
        this.setState(prevState => ({ page: prevState.page - 1 }), () => {
            this.componentDidMount(this.state.page)
        })
    };

    render() {
        return (
            <Fragment className="container-home" >
                <div>{this.muestraResultados()}</div>
                <button onClick={() => this.atrasPagina()}>ATRAS</button>
                <button onClick={() => this.adelantePagina()}>SIGUIENTE</button>
            </Fragment>
        )
    };
};

export default Home;