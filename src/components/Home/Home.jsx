import React, { Component, Fragment } from 'react';
import './Home.css';
import FilmSearch from '../FilmSearch/FilmSearch';
import '../FilmSearch/FilmSearch.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const apiKeyUser = 'b5138e06a3a9125b8c326498bbeae997';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topRatedFilms: [],
            page: 1,
            text: '',
            search: []
        }
    };


    componentDidMount() {
        this.getFilmsServices(this.state.page);
    };


    async getFilmsServices(page) {
        try {
            const peticionFilms = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyUser}&language=es-ES&page=` + page);
            this.setState({ topRatedFilms: peticionFilms.data.results });
            console.log(this.state.topRatedFilms);

        } catch (error) {
            console.log(error);
        }
    };


    addFilmsServices = (page) => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyUser}&language=es-ES&page=` + page)
            .then(api => {
                console.log(api.data.results)
                this.setState(prevState => ({ topRatedFilms: prevState.topRatedFilms.concat(api.data.results) }))
            })
            .catch(err => console.log(err));
    };


    muestraResultados = () => {
        if (this.state.topRatedFilms[0]) {
            return (
                this.state.topRatedFilms.map(film => {
                    return (
                        <Fragment>
                            <div className="container-film" key={film.id}>
                                {film.title}
                                <img className="img-film" onClick={() => this.clickElementoSeleccionado(film)} alt={film.title} src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}></img>
                                {/* {film.vote_average} */}
                            </div>
                        </Fragment>
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


    onViewMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }), () => {
            this.addFilmsServices(this.state.page);
            console.log(this.state.page)
        });
    };


    onHandleChange = (event) => {
        this.setState({ text: event.target.value }, () => {
            const data = this.state.topRatedFilms
                .filter(item => item.title.toLowerCase().includes(this.state.text.toLowerCase()));

            this.setState({ search: data });

        });

    }

    render() {
        return (
            <Fragment>
                <div className="container-home">
                    <button onClick={() => this.atrasPagina()}>ATRAS</button>
                    <button onClick={() => this.adelantePagina()}>SIGUIENTE</button>
                    <button onClick={() => this.onViewMore()}> Ver Más </button>
                    <input type="text" onChange={event => this.onHandleChange(event)} placeholder="Search..." />     
                </div>
                <div>
                    <Link className="link" to="/register">
                        REGISTRATE
                    </Link>
                </div>
                <div>{this.muestraResultados()}</div>
                <div className="grid">
                    {
                        this.state.search.length === 0 && this.state.text === ''
                            ? this.state.topRatedFilms.map( item => <FilmSearch item={item} /> )
                            : this.state.search.map( item => <FilmSearch item={item} />  )
                    }
                </div>
            </Fragment>

        )
    };
};

export default Home;