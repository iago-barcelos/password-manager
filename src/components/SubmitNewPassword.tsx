type SubmitButtonProps = {
  onClick: () => void
}

function SubmitNewPassword({ onClick }: SubmitButtonProps) {
  return (
    <button onClick={onClick}>
      Cadastrar nova senha
    </button>
  )
}

export default SubmitNewPassword;