import React, { Component } from 'react';

class FilmSearch extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div>
                <img className="img-film" src={`https://image.tmdb.org/t/p/w300${this.props.item.poster_path}`} alt={this.props.item.title} />
                <p>ID: {this.props.item.id} </p>
                <p>Titulo: {this.props.item.title} </p>
            </div>
        )
    }
}

export default FilmSearch;