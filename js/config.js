/* main.js - painel de configurações */

/* TROCA DE TELAS (sidebar) */
function mostrarTela(event, id) {
  // remove classes
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));

  // ativa seleção
  document.getElementById(id).classList.add("ativa");
  if (event && event.currentTarget) event.currentTarget.classList.add("active");
}

/* SWITCHES DE PRIVACIDADE (inicialmente DESATIVADOS, atualizam texto) */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".switch").forEach(sw => {
    // garante estado inicial coerente: sem classe "ativo" significa OFF
    updateSwitchText(sw);

    sw.addEventListener("click", () => {
      sw.classList.toggle("ativo");
      updateSwitchText(sw);
    });
  });

  /* OLHO - mostrar/ocultar senha (usa data-target para identificar o input) */
  document.querySelectorAll(".olho-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = targetId ? document.getElementById(targetId) : btn.previousElementSibling;
      if (!input) return;

      // toggle type
      if (input.type === "password") {
        input.type = "text";
        btn.title = "Ocultar senha";
        swapEyeIcon(btn, true);
      } else {
        input.type = "password";
        btn.title = "Ver senha";
        swapEyeIcon(btn, false);
      }
    });

    // tooltip via title já funcionando; opcional: mostrar um tooltip custom se quiser
  });

  /* ALTERAR FOTO - abre seletor e atualiza preview */
  const btnAlterar = document.getElementById("btnAlterarFoto");
  const inputFoto = document.getElementById("inputFoto");
  const preview = document.getElementById("fotoPerfilPreview");

  if (btnAlterar && inputFoto && preview) {
    btnAlterar.addEventListener("click", () => inputFoto.click());

    inputFoto.addEventListener("change", (ev) => {
      const file = ev.target.files && ev.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) return alert('Selecione uma imagem válida.');

      // mostra preview
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);

      // aqui você pode enviar o arquivo via fetch/ajax para o backend se quiser
    });
  }

  // fecha dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    const dd = document.getElementById("usuarioDropdown");
    if (!dd) return;
    const btn = document.querySelector('.usuario-btn');
    if (dd.classList.contains('show') && !dd.contains(e.target) && !btn.contains(e.target)) {
      dd.classList.remove('show');
    }
  });

}); // DOMContentLoaded end

/* FUNÇÕES AUXILIARES */
function updateSwitchText(sw) {
  const type = sw.getAttribute('data-type');
  const texto = sw.parentElement.querySelector('.status-text');
  if (!texto) return;
  if (type === 'perfil') {
    texto.textContent = sw.classList.contains('ativo') ? 'Público' : 'Privado';
  } else {
    texto.textContent = sw.classList.contains('ativo') ? 'Ativado' : 'Desativado';
  }
  // visual: ajusta background (se quiser mais controle, mova para CSS)
  sw.style.backgroundColor = sw.classList.contains('ativo') ? '#008000' : '#600000';
}

function swapEyeIcon(btn, isVisible) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  if (isVisible) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}