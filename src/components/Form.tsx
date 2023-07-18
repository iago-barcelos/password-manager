import { useState } from 'react';
import { UserCardList } from '../types';

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
    <div>
      {!formSubmitted ? (
        <div>
          <form onSubmit={ handleFormSubmit }>
            <label>
              Nome do serviço
              <input
                value={ inputService }
                type="text"
                required
                onChange={ (event) => setInputService(event.target.value) }
              />
            </label>

            <label>
              Login
              <input
                value={ inputLogin }
                type="text"
                required
                onChange={ (event) => setInputLogin(event.target.value) }
              />
            </label>

            <label>
              Senha
              <input
                value={ inputPassword }
                type="password"
                required
                onChange={ (event) => {
                  setInputPassword(event.target.value);
                  validatePassword(event.target.value);
                } }
              />
            </label>

            <label>
              URL
              <input
                value={ inputURL }
                type="text"
                onChange={ (event) => setInputURL(event.target.value) }
              />
            </label>

            <button
              disabled={ !generalFormValidation() }
              type="submit"
            >
              Cadastrar
            </button>

            <button onClick={ onClick }>Cancelar</button>
          </form>
        </div>
      ) : (
        <button onClick={ resetForm }>Cadastrar nova senha</button>
      )}
      <h3>
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
      </h3>
    </div>
  );
}
export default Form;
