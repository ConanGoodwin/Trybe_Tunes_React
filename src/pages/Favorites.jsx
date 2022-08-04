import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      // albumInfo: {},
      albumTracks: [],
      stateSave: false,
      stateChecked: [],
    };
  }

  componentDidMount = async () => {
    // const { match: { params: { id } } } = this.props;
    // const respApi = await getMusics(id);

    this.setState({
      // albumInfo: respApi[0],
      albumTracks: await getFavoriteSongs(),
      stateSave: true,
    }, async () => {
      const favorireSongs = await getFavoriteSongs();
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
    const { stateChecked, albumTracks } = this.state;

    this.setState({
      stateChecked:
      stateChecked.filter(({ idChk }) => idChk !== id),
      albumTracks:
      albumTracks.filter(({ trackId }) => trackId !== id),
    }, () => {
      this.setState({ stateSave: false });
    });
  }

  handleChange = (objeto, { target }) => {
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
    const { stateSave, stateChecked, albumTracks } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {(stateSave) ? (<Loading />)
          : (

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
          )}
      </div>
    );
  }
}

export default Favorites;
