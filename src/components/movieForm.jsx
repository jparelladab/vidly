import React, { Component } from 'react';

class MovieForm extends Component {
    handleSave = () => {
        // Navigate to /movies
        // with push you navigate to the path and can go back, with replace you can't go back
        //replace is often used in login pages
        this.props.history.push('/movies');
      };
    
    render(){
        const movieId = this.props.match.params.id ;
        return (
        <div>
            <h1>MovieForm - {movieId} </h1>
            <button type="button" onClick={this.handleSave} className="btn btn-primary">Save</button>
        </div> );
    }
}

export default MovieForm;