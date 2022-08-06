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
      // user: {},
      // btnSaveIsDisabled: true,
    };
  }

  componentDidMount = async () => {
    // const { match: { params: { id } } } = this.props;
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

  // chekTxtEmpty = () => {
  //   const { name, email, descricao } = this.state;

  //   return (name.length < 1 || email.length < 1 || descricao.length < 1);
  // }

  // handleChange= ({ target }) => {
  //   this.setState(() => ({ [target.name]: target.value }), () => {
  //     // const valueEnable = this.chekTxtEmpty();

  //     // this.setState({ btnSaveIsDisabled: valueEnable });
  //   });
  // }

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
                  // data-testid="edit-input-image"
                  data-testid="profile-image"
                />
                <h2>Nome:</h2>
                <p>{name}</p>
                {/* <label htmlFor="txtLoginName">
                  Nome:
                  {' '}
                  {' '}
                  <input
                    type="text"
                    name="name"
                    id="txtLoginName"
                    value={ name }
                    // data-testid="edit-input-name"
                    onChange={ this.handleChange }
                  />
                </label> */}
                <h3>Email:</h3>
                <p>{email}</p>
                {/* <label htmlFor="txtEmail">
                  Email:
                  {' '}
                  {' '}
                  <input
                    type="email"
                    name="email"
                    id="txtEmail"
                    value={ email }
                    // data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                </label> */}
                <h3>Descrição:</h3>
                <p>{description}</p>
                {/* <label htmlFor="txtDescricao">
                  Descrição:
                  {' '}
                  {' '}
                  <textarea
                    name="description"
                    id="txtDescricao"
                    value={ description }
                    // data-testid="edit-input-description"
                    onChange={ this.handleChange }
                  />
                </label> */}
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
                {/* <input
                  type="button"
                  value="Salvar"
                  // disabled={ btnSaveIsDisabled }
                  // data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  className="button"
                /> */}
              </form>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
