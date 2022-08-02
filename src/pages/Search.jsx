import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
      name: '',
    };
  }

  handleChange= ({ target }) => {
    const minCaracter = 2;
    const valueEnable = (target.value.length < minCaracter);

    this.setState({ name: target.value });

    this.setState({ btnDisabled: valueEnable });
  }

  handleClick = async () => {

  }

  render() {
    const { btnDisabled, name } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="txtLoginName">
            Artista:
            <input
              type="text"
              name=""
              id="txtLoginName"
              value={ name }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <input
              type="button"
              value="Entrar"
              disabled={ btnDisabled }
              data-testid="search-artist-button"
              onClick={ this.handleClick }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
