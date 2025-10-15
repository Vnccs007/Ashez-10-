  
let ultimoScroll = 0;
const nav = document.querySelector('.Navbar');
window.addEventListener('scroll', ()=> {

const scrollAtual = pageYOffset;

if (scrollAtual > ultimoScroll & scrollAtual > 100){
  nav.classList.add('hidden')
}else{
  nav.classList.remove('hidden');
};
ultimoScroll = scrollAtual;
})

const track = document.getElementById('carousel-track');

// Caminhos ou URLs das imagens
const slidesContent = [
  '/imgJogos/mk11.jpg',
  'imgJogos/codMWll.jpg',
  'imgJogos/ghostTsushima.jpg',
  'imgJogos/legoBatman.jpg',
  'imgJogos/readDead_ll.jpg',
  'imgJogos/forzaHorizonIV.jpg'

];

// Criar slides originais com imagem
let slides = slidesContent.map(src => {
  const div = document.createElement('div');
  div.classList.add('carousel-slide', 'shrink');

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Imagem do slide';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover'; // mantém proporção, preenche bem o slide

  div.appendChild(img);
  return div;
});

// Clonar primeiro e último slides para efeito infinito
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Inserir clones no track
track.appendChild(lastClone);
slides.forEach(slide => track.appendChild(slide));
track.appendChild(firstClone);

// Atualizar lista de slides com clones incluídos
const allSlides = Array.from(track.children);

// Index inicial - o primeiro slide original está na posição 1 (por causa do lastClone na posição 0)
let currentIndex = 1;

function updateCarousel() {
  allSlides.forEach((slide, i) => {
    slide.classList.add('shrink');
    if(i === currentIndex) slide.classList.remove('shrink');
  });

  const slideWidth = allSlides[currentIndex].offsetWidth + 20;
  const offset = (track.offsetWidth / 2) - (slideWidth / 2);
  const translateX = allSlides
    .slice(0, currentIndex)
    .reduce((acc, s) => acc + s.offsetWidth + 20, 0);

  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(${-translateX + offset}px)`;
}

function goToNextSlide() {
  if (currentIndex >= allSlides.length - 1) return;
  currentIndex++;
  updateCarousel();

  // Quando passar do último clone (que é o primeiro slide), resetar sem animação para o slide original 1
  if (currentIndex === allSlides.length - 1) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = 1;
      updateCarousel();
    }, 500); // Depois da transição acabar
  }
}

function goToPrevSlide() {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateCarousel();

  // Quando passar do primeiro clone (que é o último slide), resetar para o slide original último
  if (currentIndex === 0) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = allSlides.length - 2;
      updateCarousel();
    }, 500);
  }
}

// Autoplay infinito a cada 2s
setInterval(goToNextSlide, 3000);

window.addEventListener('load', () => {
  updateCarousel();
});

window.addEventListener('resize', () => {
  updateCarousel();
});
