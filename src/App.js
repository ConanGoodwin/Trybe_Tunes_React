import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './pagesCss/app.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logado: false,
    };
  }

  handleChangeLogado = () => {
    this.setState({ logado: true });
  }

  render() {
    const { logado } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <div className="top">
            <p>TrybeTunes</p>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              render={
                () => ((logado)
                  ? (<Redirect to="/search" />)
                  : (<Login setLog={ this.handleChangeLogado } />))
              }
            />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
