import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import SubmitNewPassword from './components/SubmitNewPassword';
import { UserCardList } from './types';

function App() {
  const showForm = false;
  const showSubmitButton = true;

  const [formState, setFormState] = useState(showForm);

  const [buttonState, setButtonState] = useState(showSubmitButton);
  const [userCardList, setUserCardList] = useState<UserCardList[]>([]);

  function handleNewPassword() {
    setFormState(!showForm);
    setButtonState(!showSubmitButton);
  }

  function handleCancel() {
    setFormState(showForm);
    setButtonState(showSubmitButton);
  }

  function renderUserCards() {
    if (userCardList.length === 0) {
      return <p>Nenhuma senha cadastrada</p>;
    }
    return (
      <div>
        <ul>
          {userCardList.map((userCard, index) => (
            <li key={ index }>
              <a href={ userCard.url }>
                {userCard.service}
              </a>
              <p>
                Login:
                {userCard.login}
              </p>
              <p>
                Senha:
                {userCard.password}
              </p>
              <button
                data-testid="remove-btn"
                { ...userCardList.filter((UserCard) => UserCard.service) }
              >
                Apagar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <header>
        <h1>Gerenciador de Senhas</h1>
      </header>
      {buttonState ? <SubmitNewPassword onClick={ () => handleNewPassword() } /> : null}
      {formState ? (
        <Form
          userCardList={ userCardList }
          setUserCardList={ setUserCardList }
          onClick={ () => handleCancel() }
        />
      ) : null}
      <div>
        { renderUserCards() }
      </div>
    </>
  );
}

export default App;
