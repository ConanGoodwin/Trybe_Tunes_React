import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, onChangeFavorite } = this.props;

    return (
      <div>
        <p>{trackName}</p>
        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div>
          <label htmlFor="chkFavorite" data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              name={ trackId }
              id="chkFavorite"
              onChange={ onChangeFavorite }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
