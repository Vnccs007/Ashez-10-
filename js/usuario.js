 function toggleMenu() {
      document.getElementById("usuarioDropdown").classList.toggle("show");
    }

    // Fecha ao clicar fora
    window.onclick = function(event) {
      if (!event.target.matches('.usuario-btn')) {
        let dropdowns = document.getElementsByClassName("dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
          dropdowns[i].classList.remove('show');
        }
      }
    }