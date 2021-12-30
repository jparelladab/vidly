import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

// inherits from Form class
class RegisterForm extends Form {
    // when working with a form you should initialize the properties of your state object either with
    //an empty string or with some value got from the server
    state = {
        data: {username: '', password: '', name: ''},
        errors: {}
    };
    
    //schemas are dependent of each form.
    // the label attribute is the pretty version of the schema key that appears in the error message

    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    componentDidMount(){
        // this.username.current.focus();
    }

    // this method will be specific for each form
    doSubmit = () => {
        //call the server
        console.log('Submitted');
    }


    render() {
        // const {username, password} = this.state.data;
        // const {username: errUsername, password: errPassword} = this.state.errors;

        return ( <div>
            <h1>Register Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}

                {this.renderSubmitButton('Register')}
            </form>
        </div> );
    }
}
 
export default RegisterForm;