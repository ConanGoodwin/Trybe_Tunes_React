import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: 'Carregando...',
    };
  }

  componentDidMount = async () => {
    const resp = await getUser();

    this.setState({ user: resp.name });
  }

  render() {
    const { user } = this.state;

    return (
      <header data-testid="header-component">
        <div>
          <p data-testid="header-user-name">{user}</p>
        </div>
        <div>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
