import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { saveMovie, getMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
    state = {
        data: {
            _id: '',
            title: '', 
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    };
    // username = React.createRef();
    
    //schemas are dependent of each form.
    // the label attribute is the pretty version of the schema key that appears in the error message
    // title_schema = Joi.string().required().label('Title');
    // // genre_schema = Joi.object({_id: Joi.string(), name: Joi.string()}).required().label('Genre');
    // numberInStock_schema = Joi.number().min(0).max(100).required().label('Number in Stock');
    // dailyRentalRate_schema = Joi.number().min(0).max(10).required().label('Daily rental rate');
    schema = {
        _id: Joi.string().allow(''),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Daily rental rate')

    }
    // schema = Joi.object().keys({
    //     title: this.title_schema,
    //     // genre: this.genre_schema,
    //     numberInStock: this.numberInStock_schema,
    //     dailyRentalRate: this.dailyRentalRate_schema
    // });


    async componentDidMount(){
        console.log('component did mount')
        const genres = await getGenres()
        this.setState({genres})
        let movieId = this.props.match.params.id
        if (movieId === 'new') return
        let movie = await getMovie(movieId)
        if (!movie){
            console.log('not found path. redirecting')
            return this.props.history.replace('/not-found');
        } else {
            const movieState = {...this.state.data};
            movieState._id = movie._id;
            movieState.title = movie.title;
            movieState.genreId = movie.genre._id;
            movieState.dailyRentalRate = movie.dailyRentalRate;
            movieState.numberInStock = movie.numberInStock 
            this.setState({data : movieState});
        }
        
        
        // this.username.current.focus();
    }

    // this method will be specific for each form
    doSubmit = () => {
        //call the server
        // const movieId = this.props.match.params.id ;
        const movie = this.state.data;
        // const movies = this.props.location.state.movs;
        saveMovie(movie);
        this.props.history.push('/movies');
    }


    // handleSave = () => {
    //     // Navigate to /movies
    //     // with push you navigate to the path and can go back, with replace you can't go back
    //     //replace is often used in login pages
    //     this.props.history.push('/movies');
    //   };
    
    render(){
        // const movieId = this.props.match.params.id ;
        // const genre = movie ? movie.genre.name : ''
        const options = this.state.genres;
        return (
        <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('title', 'Title')}
                {this.renderSelect('genreId', 'Genre', options)}
                {this.renderInput('numberInStock', 'Number in Stock' )}
                {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}

                {/* calls eventually handleSubmit (setState, errors) and doSubmit (the specific implementation) */}
                {this.renderSubmitButton('Save')}
                {/* <button type="button" onClick={this.handleSave} className="btn btn-primary">Save</button> */}
            </form>
        </div> );
    }
}

export default MovieForm;