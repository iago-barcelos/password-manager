import { useState } from 'react';
import { UserCardList } from '../types';
import eyeClosed from '../images/eye-closed.svg';
import eyeOpen from '../images/eye-open.svg';

type FormProps = {
  onClick: () => void
  setUserCardList: (userCardList: UserCardList[]) => void
  userCardList: UserCardList[]
};

function Form({ onClick, setUserCardList, userCardList }: FormProps) {
  const [inputService, setInputService] = useState('');
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputURL, setInputURL] = useState('');
  const [isPasswordLengthValid, setPasswordLengthValid] = useState(false);
  const [isPasswordLettersNumbersValid, setPasswordLettersNumbersValid] = useState(false);
  const [isPasswordSpecialValid, setPasswordSpecialValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleTogglePasswordKey(event : React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      togglePasswordVisibility();
    }
  }

  const invalidCheck = 'invalid-password-check';
  const validCheck = 'valid-password-check';

  function validatePassword(password: string) {
    const isValidLength = password.length >= 8 && password.length <= 16;
    const hasLettersAndNumbers = /^(?=.*?[A-Za-z])(?=.*?[0-9])/i.test(password);
    const hasSpecialCharacter = /^(?=.*?[!@#$%^&*()])/i.test(password);
    setPasswordLengthValid(isValidLength);
    setPasswordLettersNumbersValid(hasLettersAndNumbers);
    setPasswordSpecialValid(hasSpecialCharacter);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newUserCard = {
      service: inputService,
      login: inputLogin,
      password: inputPassword,
      url: inputURL,
    };
    setUserCardList([...userCardList, newUserCard]);
    setInputService('');
    setInputLogin('');
    setInputPassword('');
    setInputURL('');
    setFormSubmitted(true);
  }

  function inputServiceValidation() {
    return inputService.length;
  }

  function inputLoginValidation() {
    return inputLogin.length;
  }

  function inputPasswordValidation() {
    const password = inputPassword;
    const regex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])/;
    const isValidLength = password.length >= 8 && password.length <= 16;
    const isValidFormat = regex.test(password);
    return isValidLength && isValidFormat;
  }

  function generalFormValidation() {
    const serviceValidation = inputServiceValidation();
    const loginValidation = inputLoginValidation();
    const passwordValidation = inputPasswordValidation();

    return serviceValidation && loginValidation && passwordValidation;
  }

  function resetForm() {
    setInputService('');
    setInputLogin('');
    setInputPassword('');
    setInputURL('');
    setFormSubmitted(false);
  }

  return (
    <div className="form-div">
      {!formSubmitted ? (
        <div>
          <form
            onSubmit={ handleFormSubmit }
            className="form-container"
          >
            <label className="label-item">
              Nome do serviço
              <input
                className="input-service"
                value={ inputService }
                type="text"
                required
                onChange={ (event) => setInputService(event.target.value) }
              />
            </label>

            <label className="label-item">
              Login
              <input
                className="input-login"
                value={ inputLogin }
                type="text"
                required
                onChange={ (event) => setInputLogin(event.target.value) }
              />
            </label>

            <label className="label-password">
              Senha
              <input
                className="input-password"
                value={ inputPassword }
                type={ showPassword ? 'text' : 'password' }
                required
                onChange={ (event) => {
                  setInputPassword(event.target.value);
                  validatePassword(event.target.value);
                } }
              />
              <img
                src={ showPassword ? eyeClosed : eyeOpen }
                alt="password-eye"
                className="password-toggle"
                onClick={ togglePasswordVisibility }
                onKeyDown={ handleTogglePasswordKey }
                tabIndex={ 0 }
              />
            </label>

            <label className="label-item">
              URL
              <input
                className="input-URL"
                value={ inputURL }
                type="text"
                onChange={ (event) => setInputURL(event.target.value) }
              />
            </label>

          </form>
          <div className="sign-and-cancel">
            <a
              className="cancel-button"
              onClick={ onClick }
            >
              Cancelar
            </a>
            <button
              className="sign-button"
              disabled={ !generalFormValidation() }
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </div>
      ) : (
        <button onClick={ resetForm }>Cadastrar nova senha</button>
      )}
      <div className="password-criteria">
        A senha deve obecer os seguintes critérios:
        <p className={ isPasswordLengthValid ? validCheck : invalidCheck }>
          Possuir 8 ou mais caracteres
        </p>
        <p className={ isPasswordLengthValid ? validCheck : invalidCheck }>
          Possuir até 16 caracteres
        </p>
        <p className={ isPasswordLettersNumbersValid ? validCheck : invalidCheck }>
          Possuir letras e números
        </p>
        <p className={ isPasswordSpecialValid ? validCheck : invalidCheck }>
          Possuir algum caractere especial
        </p>
      </div>
    </div>
  );
}
export default Form;
