import React from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({errors: errors.concat(error)});
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = {message: 'Password is not valid'};
      this.setState({errors: errors.concat(error)});
      return false;
    } else {
      //form valid
      return true;
    }
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    console.log('handle submit');
    event.preventDefault(); /* Default is to reload the page, we want to prevent that. */
    if (this.isFormValid()) {
      console.log('form valid');
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          this.setState({ loading: false });
        })
        .catch(err => {
          console.error(err);
          this.setState({ errors: this.state.errors.concat(err), loading: false });
        });
    }
  };

  handleInputError = (errors, inputName) => {
    // console.log(errors);
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  };

  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="yellow" textAlign="center">
            <Icon name="lemon" color="yellow" />
            Register for LemonChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid name="username" value={username} icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" />
              <Form.Input fluid name="email" value={email} icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} className={this.handleInputError(errors, 'email')} type="text" />
              <Form.Input fluid name="password" value={password} icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} className={this.handleInputError(errors, 'password')} type="password" />
              <Form.Input fluid name="passwordConfirmation" value={passwordConfirmation} icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} className={this.handleInputError(errors, 'password')} type="password" />
              <Button disabled={loading} className={loading ? 'loading' : ''} color="yellow" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Already a user?<Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register;