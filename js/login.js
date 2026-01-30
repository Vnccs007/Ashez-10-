const QloginEmail = document.getElementById('loginEmail');
const QloginSenha = document.getElementById('loginSenha');

async function validar(){
    let usuario = null;
    try {
        const res = await fetch(`/login/${QloginEmail.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error('Usuário não encontrado!');
        }
        const user_Dados = await res.json();
        usuario = user_Dados;
        if(usuario.senha != QloginSenha.value){
            alert("Senha incorreta!");
            return;
        }
        console.log(usuario.id);
        usuario = localStorage.setItem('usuario', JSON.stringify(usuario));
        window.location.assign("../index.html");
        return usuario;
    } catch (Error) {
        alert(Error);
    }
};