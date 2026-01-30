function getUsuario() {
    const usuarioSalvo = localStorage.getItem('usuario');
    console.log ("Aqui:", usuarioSalvo);
    let condiçao = JSON.parse(usuarioSalvo) ?? {"id": 0};
    console.log("Condição do getUsuario:", condiçao.id);
    return condiçao;
}
const usuario = getUsuario();
console.log("Usuario salvo: ", usuario.id);
const user_ID =  usuario.id;
console.log("ID do usuário:", user_ID);

if (user_ID) {
    fetch(`/cadastro/${user_ID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'GET',
        })
        
        .then(res => res.json())
        .then(user_Dados => 
            // tudo teste
            //console.log("Usuário:", user_Dados)) 
            //dados = user_Dados,
            //console.log("Usuárioo:", dados))
            document.getElementById("User_Name").innerHTML = user_Dados.nome)
        .catch(err => console.error(err));
        }

