import { useState } from "react";

type FormProps = {
    onClick: () => void
}

function Form({ onClick }: FormProps) {
  
  const [inputService, setInputService] = useState('')
  const [inputLogin, setInputLogin] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputURL, setInputURL] = useState('')

  function handleServiceName(event: React.ChangeEvent<HTMLInputElement>) {
    setInputService(event.target.value)
  }

  function handleLogin(event: React.ChangeEvent<HTMLInputElement>) {
    setInputLogin(event.target.value)
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setInputPassword(event.target.value)
  }

  function handleURL(event: React.ChangeEvent<HTMLInputElement>) {
    setInputURL(event.target.value)
  }

  function handleFormSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function inputServiceValidation() {
    return inputService.length
  }

  function inputLoginValidation() {
    return inputLogin.length
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

  return (
    <div>
      <form onSubmit={ handleFormSubmit }>
        
        <label>Nome do serviço
          <input 
          value={ inputService } 
          type="text" 
          required 
          onChange={(event) => setInputService(event.target.value)} />
        </label>

        <label>Login
          <input 
          value={ inputLogin }
          type="text" 
          required 
          onChange={(event) => setInputLogin(event.target.value)}/>
        </label>

        <label>Senha
          <input 
          value={ inputPassword }
          type="password" 
          required 
          onChange={(event) => setInputPassword(event.target.value)}/>
        </label>

        <label>URL
          <input 
          value={ inputURL }
          type="text" 
          onChange={(event) => setInputURL(event.target.value)}/>
        </label>

        <button disabled={ !generalFormValidation()  }  type="submit">Cadastrar</button>

        <button onClick={onClick}>Cancelar</button>
      </form>
    </div>
  )
}
export default Form;
