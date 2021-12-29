import React, { Component } from 'react';
import Joi  from 'joi-browser';
import Input from './input';
import Select from './select';
import {capitalizeFirstLetter} from '../../utils/helperFunctions';
import {getGenres} from '../../services/fakeGenreService';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };
    // all children instances of form must define their own Joi schema

    validate = () => {
        //here we use joi library to validate the inputs
        //but we can also write custom validations
        // abortEarly means terminate validation as soon as it finds one error. In the error message we only get one message
        //here under we just take the error from result.error
        const options = {abortEarly: false, stripUnknown: true };
        const {error} = Joi.validate(this.state.data, this.schema, options);
        // console.log(error);
        if (!error) return null;
        const errors = {};
        for(let detail of error.details){
            errors[detail.path[0]] = detail.message;
        }
        console.log(errors)
        return errors;

        // const {data} = this.state;
        // const errors = {};
        //trim() gets rid of empty spaces at the beginning end end of string
        // if (data.username.trim() === ''){
        //     errors.username = 'Username is required.'
        // }
        // if (data.password.trim() === ''){
        //     errors.password = 'Password is required.'
        // }
        // return errors;
        //the official retorn is below, but I don't see why we can't use just errors
        // return Object.keys(errors).length === 0 ? null : errors;
    };

    //with object destructuring
    // returs error message if any, or null
    validateProperty = (input) => {
        // assigning dynamically one of the schemas
        // need to use either name (for normal inputs or id for selects)
        console.log(input.id)
        const schema = (input.name) ? this[input.name + '_schema'] : this[input.id + '_schema'];
        // get the input object
        // extract the input schema into a separate schema
        // on the tutorial you are supposed to pass only the specific schema key, but it works only with the whole schema
        const {error} = Joi.validate(input.value, schema);
        console.log(error)

        return error ? error.details[0].message : {};
        
        // that was the manual validation
        // if .value === ''){
        //     errorMessage[input.name] = `${input.name} is required`;
        // }
        // return errorMessage;
    }

    
    handleSubmit = e => {
        e.preventDefault();
        // in plain old vanilla js we would do:
        // const username = document.getElementById('username').nodeValue;
        // but we avoid doing it in React, because the whole point of React is being a layer of abstraction over the DOM
        // so we try to use the react ref, as an example, but it's better not to use it
        // const username = this.username.current.value;
        // we'll finally use the state and the input onchange property to control the username and password values
        const errors = this.validate();
        // when no errors, errors needs to be an empty object instead of NULL, to avoid runtime error
        this.setState({ errors : errors || {} });
        
        // if errors object has any key (meaning that there is an error in username or password), return
        if (Object.keys(this.state.errors).length !== 0) return;
        
        // this method will be implemented into the child implementation (where to submit and what to do after will vary in each form)
        this.doSubmit();
    }

    handleChange = ({currentTarget: input}) => {
        //Here we modify the error and data states on input change
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (Object.keys(errorMessage).length !== 0){
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        }
        // Here is where we control the input component
        // instead of e => {} we destructure the event
        // currentTarget renamed as input
        const data = {...this.state.data};
        // data.username = e.currentTarget.value;
        if (input.name){
            data[input.name] = input.value;
        } else {
            data[input.id] = input.value;
        }
        this.setState({data, errors});
    }

    //Select has its own handleChange
    handleChangeSelect = ({currentTarget: input}) => {
        //here we ignore errors, as it's a dropdown
        const data = {...this.state.data};
        const genre = getGenres().find(g => g.name === input.value);
        data.genre = genre;
        this.setState({data});
    }

    renderSubmitButton = (label) => {
        return <button disabled = { this.validate() } className="btn btn-primary">{label}</button>
    }

    renderInput = (name, label = capitalizeFirstLetter(name), type = 'text') => {
        const {data, errors} = this.state;
        // console.log(data)
        return <Input 
            name={name}
            type={type}
            value={data[name]}
            onChange={this.handleChange}
            id={name}
            label={label}
            error={errors[name]}
        />
    }

    renderSelect = (name, label, options) => {
        const {data} = this.state;
        return <Select 
            value={data[name]['name']}
            onChange={this.handleChangeSelect}
            name={name}
            id={name}
            label={label}
            options={options}
        />
    }

}
 
export default Form;