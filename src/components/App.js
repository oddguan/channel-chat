import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = ({ currentUser }) => (
  <Grid columns="equal" className="app" style={{ background: '#eee' }}>
    <ColorPanel />

    <SidePanel currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

/* Only use connect once, and pass down the user data down to each component. */
export default connect(mapStateToProps)(App);
