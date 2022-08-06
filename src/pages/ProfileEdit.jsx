import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      stateSave: true,
      name: '',
      email: '',
      description: '',
      image: '',
      btnSaveIsDisabled: true,
    };
  }

  setBtnDisabled = () => {
    const valueEnable = this.checkTxtEmpty();
    // valueEnable = this.checkEmail();

    this.setState({ btnSaveIsDisabled: valueEnable });
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
      }), () => {
        this.setBtnDisabled();
      });
    });
  }

  checkTxtEmpty = () => {
    const { name, email, description, image } = this.state;

    return (
      name.length < 1 || email.length < 1 || description.length < 1 || image.length < 1
    );
  }

  checkEmail = () => {
    const { email } = this.state;
    const dCom = 4;

    return (
      email.split('@').length !== 2
       || email.substring(email.length - dCom, email.length) !== '.com'
    );
  }

  handleChange= ({ target }) => {
    this.setState(() => ({ [target.name]: target.value }), () => {
      this.setBtnDisabled();
    });
  }

  handleClick = () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;

    this.setState({ stateSave: true }, async () => {
      await updateUser({
        name,
        email,
        image,
        description,
      });
      history.push('/profile');
    });
  }

  render() {
    const { stateSave, name, email, description } = this.state;
    const { image, btnSaveIsDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {(stateSave) ? (<Loading />)
          : (
            <div>
              <form>
                <img
                  src={ image }
                  alt=""
                  style={ { width: '100px', height: '100px', border: '1px solid black' } }
                />
                <label htmlFor="txtURLImage">
                  URL foto:
                  {' '}
                  {' '}
                  <input
                    type="text"
                    name="image"
                    id="txtURLImage"
                    value={ image }
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="txtLoginName">
                  Nome:
                  {' '}
                  {' '}
                  <input
                    type="text"
                    name="name"
                    id="txtLoginName"
                    value={ name }
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="txtEmail">
                  Email:
                  {' '}
                  {' '}
                  <input
                    type="email"
                    name="email"
                    id="txtEmail"
                    value={ email }
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="txtDescricao">
                  Descrição:
                  {' '}
                  {' '}
                  <textarea
                    name="description"
                    id="txtDescricao"
                    value={ description }
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                  />
                </label>
                <input
                  type="button"
                  value="Salvar"
                  disabled={ btnSaveIsDisabled }
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  className="button"
                />
              </form>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
