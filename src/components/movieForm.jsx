import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { saveMovie, getMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {
    state = {
        data: {
            _id: '',
            title: '', 
            genre: {_id: '', name: ''},
            numberInStock: '',
            dailyRentalRate: ''
        },
        errors: {}
    };
    // username = React.createRef();
    
    //schemas are dependent of each form.
    // the label attribute is the pretty version of the schema key that appears in the error message
    title_schema = Joi.string().required().label('Title');
    // genre_schema = Joi.object({_id: Joi.string(), name: Joi.string()}).required().label('Genre');
    numberInStock_schema = Joi.number().min(0).max(100).required().label('Number in Stock');
    dailyRentalRate_schema = Joi.number().min(0).max(10).required().label('Daily rental rate');
    
    schema = Joi.object().keys({
        title: this.title_schema,
        // genre: this.genre_schema,
        numberInStock: this.numberInStock_schema,
        dailyRentalRate: this.dailyRentalRate_schema
    });

    componentDidMount(){
        console.log('component did mount')
        console.log(this.props.location.state)
        let movie = this.props.location.state.mov;
        // console.log('mooovie', movie);
        const movieState = {...this.state.data};
        if (movie._id){
            movieState._id = movie._id;
            movieState.title = movie.title;
            movieState.genre = movie.genre;
            movieState.dailyRentalRate = movie.dailyRentalRate;
            movieState.numberInStock = movie.numberInStock 
        }
        console.log('mooovie', movieState);
        this.setState({data : movieState});
        
        // this.username.current.focus();
    }

    // this method will be specific for each form
    doSubmit = () => {
        //call the server
        // const movieId = this.props.match.params.id ;
        const movie = this.state.data;
        console.log('submitt', movie)
        const movies = this.props.location.state.movs;


        // console.log('Submitted', movie, movies);
        saveMovie(movie, movies);
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
        const options = getGenres();
        // console.log(genres);
        return (
        <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('title', 'Title')}
                {this.renderSelect('genre', 'Genre', options)}
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