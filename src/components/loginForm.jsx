import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

// inherits from Form class
class LoginForm extends Form {
    // when working with a form you should initialize the properties of your state object either with
    //an empty string or with some value got from the server
    state = {
        data: {username: '', password: ''},
        errors: {}
    };
    // username = React.createRef();
    
    //schemas are dependent of each form.
    // the label attribute is the pretty version of the schema key that appears in the error message
    username_schema = Joi.string().required().label('Username');
    password_schema = Joi.string().required().label('Password');
    schema = Joi.object({
        username: this.username_schema,
        password: this.password_schema
    });

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
            <h1>Login Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}

                {this.renderSubmitButton('Login')}
            </form>
        </div> );
    }
}
 
export default LoginForm;