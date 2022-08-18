import React from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../pagesCss/search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
      name: '',
      artista: '',
      stateSearch: false,
      searchResult: [],
    };
  }

  handleChange= ({ target }) => {
    const minCaracter = 2;
    const valueEnable = (target.value.length < minCaracter);

    this.setState({ name: target.value });

    this.setState({ btnDisabled: valueEnable });
  }

  handleClick = async () => {
    const { name } = this.state;

    this.setState({ stateSearch: true }, async () => {
      const result = await searchAlbumsAPI(name);

      this.setState({
        stateSearch: false, searchResult: result, name: '', artista: name,
      });
    });
  }

  render() {
    const { btnDisabled, name, stateSearch, searchResult, artista } = this.state;

    return (
      <div data-testid="page-search" className="pageSearch">
        <Header />
        <br />
        { (stateSearch) ? <Loading />
          : (
            <form className="formSearch">
              <label htmlFor="txtLoginName" className="lblSearch">
                Artista:
                {' '}
                {' '}
                <input
                  type="text"
                  name=""
                  id="txtLoginName"
                  value={ name }
                  className="txtSearch"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                />
                <input
                  type="button"
                  value="Entrar"
                  disabled={ btnDisabled }
                  data-testid="search-artist-button"
                  onClick={ this.handleClick }
                  className="button"
                />
              </label>
            </form>
          )}
        {(searchResult.length === 0) ? <h2>Nenhum álbum foi encontrado</h2> : (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              {artista}
            </p>
            <section style={ { display: 'flex', flexWrap: 'wrap' } }>
              {searchResult.map((item) => (
                <CardAlbum
                  key={ item.collectionId }
                  artistName={ item.artistName }
                  cape={ item.artworkUrl100 }
                  collectionName={ item.collectionName }
                  collectionId={ item.collectionId }
                  trackCount={ item.trackCount }
                />
              ))}
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
