const formulario = document.querySelector('form');
const Qnome = document.getElementById('nome');
const Qemail = document.getElementById('email');
const Qdata_nascimento = document.getElementById('nascimento');
const Qsenha = document.getElementById('senha');
const Qconfirmaçao_senha = document.getElementById("confirmacaoSenha");


function adicionarUsuario(){
    
    if(Qsenha.value != Qconfirmaçao_senha.value){
        alert("As senhas não coincidem!");
        return;
    }

    //formulario.addEventListener('submit', function (event){
    //event.preventDefault();

    validarNome();
};

async function validarNome (){
    try {
        const res = await fetch(`/cadastro/Nome/${Qnome.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        });
        if (res.ok) {
            throw new Error('Nome já cadastrado');
        }
        
        return validarEmail();
    } catch (Error) {
        alert(Error);
    }
}

async function validarEmail (){
    try {
        const res = await fetch(`/cadastro/Email/${Qemail.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        });
        if (res.ok) {
            throw new Error('Email já cadastrado');
        }
        return cadastrar();
        
    } catch (Error) {
        alert(Error);
    }
}

async function cadastrar(){
    let usuario = null;
    try {
        const res = await fetch('/cadastro', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    nome: Qnome.value,
                    email: Qemail.value,
                    data_nascimento: Qdata_nascimento.value,
                    senha: Qsenha.value
                }
            ),
        });
        const user_Dados = await res.json();
        usuario = user_Dados;
        usuario = localStorage.setItem('usuario', JSON.stringify(usuario));
        const usuarioSalvo = localStorage.getItem('usuario');
        console.log ("Aqui:", usuarioSalvo);
        console.log("Usuário salvo:", JSON.parse(usuarioSalvo).id);
        window.location.assign("../index.html");
        return usuario;
    } catch (Error) {
        console.error(Error);
    }
};