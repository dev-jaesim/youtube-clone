import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_action';

class RegisterLogin extends Component {
    state = {
        email: '',
        password: '',
        errors: []
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitForm = event => {
        event.preventDefault();

        const dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        if(this.isFormvalid(this.state)) {
            this.setState({ errors: [] });
            this.props.dispatch(loginUser(dataToSubmit))
                .then(response => { 
                    if(response.payload.loginSuccess) {
                        console.log(response.payload);
                        // this.props.history.push('/about');                        
                        // return <Navigate to="/about" replace={true} />;
                        // navigate('/about');
                    } else {
                        this.setState({ 
                            errors: this.state.errors.concat(
                                "Login fails. Please check your email and password."
                            )
                        });

                        console.log(this.state.errors.length);
                    }
                 });
        };
    };

    isFormvalid = ({ email, password}) => email && password;

    displayErrors = errors => {
        errors.map((err, i) => <p key={i}> {err} </p>)
    }

    render() {
        return (
            <div className='container'>
                <h2> Login </h2>
                <div className='row'>
                    <form className='col s12' onSubmit={event => this.submitForm(event)}>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id='email'
                                    type='email'
                                    className='validate' 
                                />
                                <label htmlFor='email'>Email</label>
                                <span
                                    className='helper-text'
                                    data-error='Type a right type email'
                                    data-success='right'
                                    />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input
                                        name="password"
                                        value={this.state.password}
                                        onChange={e => this.handleChange(e)}
                                        id='password'
                                        type='password'
                                        className='validate' 
                                    />
                                    <label htmlFor='password'>password</label>
                                    <span
                                        className='helper-text'
                                        data-error='wrong'
                                        data-success='right'
                                        />
                            </div>
                        </div>

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        <div className='row'>
                            <div className='col 12'>
                                <button 
                                    className='btn waves-effect red lighten-2'
                                    type='submit'
                                    name='action'
                                    onClick={this.submitForm}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(RegisterLogin);