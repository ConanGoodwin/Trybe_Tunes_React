import React from 'react';
import '../componentsCss/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
