import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import SubmitNewPassword from './components/SubmitNewPassword';

function App() {
  const showForm = false;
  const showSubmitButton = true;

  const [formState, setFormState] = useState(showForm);

  const [buttonState, setButtonState] = useState(showSubmitButton);

  function handleSubmit() {
    setFormState(!showForm);
    setButtonState(!showSubmitButton);
  }

  function handleCancel() {
    setFormState(showForm);
    setButtonState(showSubmitButton);
  }

  return (
    <>
      <header>
        <h1>Gerenciador de Senhas</h1>
      </header>
      {buttonState ? <SubmitNewPassword onClick={ () => handleSubmit() } /> : null}
      {formState ? <Form onClick={ () => handleCancel() } /> : null}
    </>
  );
}

export default App;
