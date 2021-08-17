import React, { Component } from 'react';
import Input from '../common/input';
import Joi from 'joi-browser';

class LoginForm extends Component {
    state = {
        account: {username: '', password: ''},
        errors: {}
    };
    username = React.createRef();
    
    schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    componentDidMount(){
        // this.username.current.focus();
    }

    validateProperty = (input) => {
        const errorMessage = {};
        console.log(input);
        if (input.value === ''){
            errorMessage[input.name] = `${input.name} is required`;
        }
        return errorMessage;
    }

    validate = () => {
        //here we use joi library to validate the inputs
        //but we can also write custom validations
        const result = Joi.validate(this.state.account, this.schema, {abortEarly: false});
        console.log(result.error.details);
        if (!result.error) return null;
        const errors = {};
        for(let detail of result.error.details){
            errors[detail.path[0]] = detail.message;
        }
        return errors;

        // const {account} = this.state;
        // const errors = {};
        //trim() gets rid of empty spaces at the beginning end end of string
        // if (account.username.trim() === ''){
        //     errors.username = 'Username is required.'
        // }
        // if (account.password.trim() === ''){
        //     errors.password = 'Password is required.'
        // }
        // return errors;
        //the official retorn is below, but I don't see why we can't use just errors
        // return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        // in plain old vanilla js we would do:
        // const username = document.getElementById('username').nodeValue;
        // but we avoid doing it in React, because the whole point of React is being a layer of abstraction over the DOM
        // so we try to use the react ref, as an example, but it's better not to use it
        // const username = this.username.current.value;
        // we'll finally use the state and the input onchange property to controll the username and password values
        const errors = this.validate();
        this.setState({errors});
        if (Object.keys(errors).length !== 0) return;
        
        //call the server
        console.log('Submitted');
    }
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        // console.log(errorMessage);
        if (Object.keys(errorMessage).length !== 0){
            errors[input.name] = errorMessage[input.name];
        } else {
            delete errors[input.name];
        }
        // instead of e => {} we destructure the event
        // currentTarget renamed as input
        const account = {...this.state.account};
        // account.username = e.currentTarget.value;
        account[input.name] = input.value;
        this.setState({account, errors});
    }
    render() {
        const {username, password} = this.state.account;
        const {username: errUsername, password: errPassword} = this.state.errors;
        return ( <div>
            <h1>Login Form</h1>
            <form onSubmit={this.handleSubmit}>
                
                    <Input 
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        id="username"
                        type="text"
                        classes='form-control'
                        label="Username"
                        error={errUsername}
                    />
                    <Input 
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        id="password"
                        type="text"
                        classes='form-control'
                        label="Password"
                        error={errPassword}
                    />

                <button className="btn btn-primary">Login</button>
            </form>
        </div> );
    }
}
 
export default LoginForm;