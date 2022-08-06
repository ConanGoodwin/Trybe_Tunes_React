import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      stateSave: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount = async () => {
    const respApi = await getUser();
    const { name, email, description, image } = respApi;

    this.setState({
      stateSave: true,
    }, async () => {
      this.setState(() => ({
        stateSave: false,
        name,
        email,
        description,
        image,
      }));
    });
  }

  render() {
    const { stateSave, name, email, description, image } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {(stateSave) ? (<Loading />)
          : (
            <div>
              <form>
                <img
                  src={ image }
                  alt=""
                  style={ { width: '100px', height: '100px', border: '1px solid black' } }
                  data-testid="profile-image"
                />
                <h2>Nome:</h2>
                <p>{name}</p>
                <h3>Email:</h3>
                <p>{email}</p>
                <h3>Descrição:</h3>
                <p>{description}</p>
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
              </form>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
