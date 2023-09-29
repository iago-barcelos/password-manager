type SubmitButtonProps = {
  onClick: () => void
};

function SubmitNewPassword({ onClick }: SubmitButtonProps) {
  return (
    <button
      onClick={ onClick }
      className="new-password-button"
    >
      Cadastrar nova senha
    </button>
  );
}

export default SubmitNewPassword;
