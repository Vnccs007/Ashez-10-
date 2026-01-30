
async function buscarJogo(id){
    let jogo = null;
    try{
        const res = await fetch(`http://localhost:2008/jogos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error('Jogo não encontrado!');
        }
        const jogo_Dados = await res.json();
        jogo = jogo_Dados;
    }
    catch(error){
        alert(Error);
    }
    

}