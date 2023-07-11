type FormProps = {
    onClick?: () => void
}

function Form({ onClick }: FormProps) {
    return(
        <form>
            <label>Nome do serviço
                <input type="text" />
            </label>
            <label>Login
                <input type="text" />
            </label>
            <label>Senha
                <input type="password" />
            </label>
            <label>URL
                <input type="text" />
            </label>
            <button type="submit">Cadastrar</button>
            <button onClick={ onClick }>Cancelar</button>
        </form>
    )
}
export default Form
