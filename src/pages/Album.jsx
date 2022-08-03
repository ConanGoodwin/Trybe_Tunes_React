import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import '../componentsCss/musicCard.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumInfo: {},
      albumTracks: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const respApi = await getMusics(id);
    console.log(respApi);

    this.setState({
      albumInfo: respApi[0],
      albumTracks: respApi.filter(({ kind }) => kind === 'song'),
    });
  }

  handleChange = (objeto, { target }) => {
    console.log(objeto);
    console.log(target.checked);
  }

  render() {
    const { albumInfo, albumTracks } = this.state;
    console.log(albumTracks);

    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div>
            Artista:
            {' '}
            <span data-testid="artist-name">{albumInfo.artistName}</span>
            {' :|: '}
          </div>
          <div>
            Album:
            {' '}
            <span data-testid="album-name">{albumInfo.collectionName}</span>
          </div>
        </section>
        <section>
          <ul>
            {(albumTracks.length > 0) && (
              albumTracks.map((item) => (
                <li key={ item.trackId }>
                  <MusicCard
                    trackName={ item.trackName }
                    previewUrl={ item.previewUrl }
                    trackId={ item.trackId }
                    onChangeFavorite={ (event) => this.handleChange(item, event) }
                  />
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
