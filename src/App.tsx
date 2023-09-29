import { useState } from 'react';
import Form from './components/Form';
import SubmitNewPassword from './components/SubmitNewPassword';
import { UserCardList } from './types';
import Vector from './components/Vector';
import Unlocker from './images/icon _unlock_.svg';
import './App.css';

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
      return (
        <div className="no-password-submitted">
          <p>Nenhuma senha cadastrada</p>
          <img src={ Unlocker } alt="unlock" />
        </div>
      );
    }
    return (
      <div>
        {userCardList.map((userCard, index) => (
          <div key={ index } className="user-card">
            <a href={ userCard.url }>
              {userCard.service}
            </a>
            <p>
              Login:
              <span>{userCard.login}</span>
            </p>
            <p>
              Senha:
              <span>{userCard.password}</span>
            </p>
            <button
              className="remove-button"
              data-testid="remove-btn"
              onClick={ () => {
                const newCardList = userCardList
                  .filter((item) => item.service !== userCard.service);
                setUserCardList(newCardList);
              } }
            >
              Apagar
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Gerenciador de Senhas</h1>
      </header>
      {buttonState ? <SubmitNewPassword onClick={ () => handleNewPassword() } /> : null}
      <Vector />
      {formState ? (
        <div className="form-group">
          <Form
            userCardList={ userCardList }
            setUserCardList={ setUserCardList }
            onClick={ () => handleCancel() }
          />
        </div>
      ) : null}
      <div>
        {renderUserCards()}
      </div>
    </div>
  );
}

export default App;
