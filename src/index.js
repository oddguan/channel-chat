import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'; 

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/');
      }
    })
  }

  render() {
    return (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
    );
  }
}

const RootWithAuth = withRouter(Root); // a higher order component to wrap the the root component

ReactDOM.render(
<Router>
  <RootWithAuth />
</Router>, 
document.getElementById('root'));
registerServiceWorker();
