import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { artistName, cape, collectionName } = this.props;
    const { collectionId, trackCount } = this.props;

    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        <p>{artistName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          {collectionName}
        </Link>
        <img src={ cape } alt={ collectionName } style={ { width: '200px' } } />
        <p>
          Nomero de faixas:
          {' '}
          <span>{trackCount}</span>
        </p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  cape: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default CardAlbum;
