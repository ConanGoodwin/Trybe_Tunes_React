import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../pagesCss/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
      name: '',
      stateSave: false,
    };
  }

  handleChange= ({ target }) => {
    const minCaracter = 3;
    const valueEnable = (target.value.length < minCaracter);

    this.setState({ name: target.value });

    this.setState({ btnDisabled: valueEnable });
  }

  handleClick = async () => {
    const { name } = this.state;
    const { setLog } = this.props;

    this.setState({ stateSave: true });
    await createUser({ name });
    setLog();
  }

  render() {
    const { btnDisabled, name, stateSave } = this.state;

    return (
      <div data-testid="page-login">
        { (stateSave) ? <Loading />
          : (
            <div className="form">
              <form>
                <label htmlFor="txtLoginName">
                  Nome:
                  {' '}
                  {' '}
                  <input
                    type="text"
                    name=""
                    id="txtLoginName"
                    value={ name }
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                  />
                  {' '}
                  {' '}
                  <input
                    type="button"
                    value="Entrar"
                    disabled={ btnDisabled }
                    data-testid="login-submit-button"
                    onClick={ this.handleClick }
                    className="button"
                  />
                </label>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  setLog: PropTypes.func.isRequired,
};

export default Login;
