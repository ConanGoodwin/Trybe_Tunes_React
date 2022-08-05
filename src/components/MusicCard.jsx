import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, onChangeFavorite, setCheked } = this.props;
    const isCheked = setCheked.some(({ idChk }) => idChk === trackId);

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
          <label htmlFor="chkFavorite">
            Favorita
            <input
              type="checkbox"
              name={ trackId }
              id="chkFavorite"
              checked={ isCheked }
              onChange={ onChangeFavorite }
              data-testid={ `checkbox-music-${trackId}` }
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
  setCheked: PropTypes.arrayOf(
    PropTypes.shape({
      idChk: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MusicCard;
