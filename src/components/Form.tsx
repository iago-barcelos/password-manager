function Form() {
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
            <button>Cadastrar</button>
            <button>Cancelar</button>
        </form>
    )
}
export default Form
