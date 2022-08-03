import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
// import '../componentsCss/musicCard.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumInfo: {},
      albumTracks: [],
      stateSave: false,
      stateChecked: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const respApi = await getMusics(id);

    this.setState({
      albumInfo: respApi[0],
      albumTracks: respApi.filter(({ kind }) => kind === 'song'),
      stateSave: true,
    }, async () => {
      const favorireSongs = await getFavoriteSongs();
      console.log(favorireSongs);
      favorireSongs.map(({ trackId }) => this.checkStateChecked(trackId));
      this.setState(() => ({ stateSave: false }));
    });
  }

  checkStateChecked = (id) => {
    this.setState((prevState) => (
      {
        stateChecked:
          [...prevState.stateChecked, { idChk: id }],
      }
    ), () => {
      this.setState(() => ({ stateSave: false }));
    });
  }

  desCheckStateChecked = (id) => {
    const { stateChecked } = this.state;

    this.setState({
      stateChecked:
      stateChecked.filter(({ idChk }) => idChk !== id),
    }, () => {
      this.setState({ stateSave: false });
    });
  }

  handleChange = (objeto, { target }) => {
    // console.log(stateChecked);

    if (target.checked) {
      this.setState({ stateSave: true }, async () => {
        await addSong(objeto);
        this.checkStateChecked(parseInt(target.name, 10));
      });
    } else {
      this.setState({ stateSave: true }, async () => {
        await removeSong(objeto);
        this.desCheckStateChecked(parseInt(target.name, 10));
      });
    }
  }

  render() {
    const { albumInfo, albumTracks, stateSave, stateChecked } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {(stateSave) ? (<Loading />)
          : (
            <div>
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
                          setCheked={ stateChecked }
                        />
                      </li>
                    ))
                  )}
                </ul>
              </section>
            </div>
          )}
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
//
