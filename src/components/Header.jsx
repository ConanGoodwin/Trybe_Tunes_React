import React from 'react';
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
      </header>
    );
  }
}

export default Header;
