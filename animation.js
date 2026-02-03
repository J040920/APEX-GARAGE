// Lógica do Slider Principal
let items = document.querySelectorAll('.list .item');
let dots = document.querySelectorAll('.indicators ul li span');
let prev = document.querySelector('.arrow-left');
let next = document.querySelector('.arrow-right');
let numberDisplay = document.querySelector('.indicators .number');

let active = 0;
let countItems = items.length;

function showSlider() {
    let itemActiveOld = document.querySelector('.list .item.active');
    if (itemActiveOld) itemActiveOld.classList.remove('active');

    let dotActiveOld = document.querySelector('.indicators ul li span.active');
    if (dotActiveOld) dotActiveOld.classList.remove('active');

    items[active].classList.add('active');
    dots[active].classList.add('active');

    if (numberDisplay) {
        numberDisplay.innerText = '0' + (active + 1);
    }
}

next.onclick = () => {
    active = active + 1 < countItems ? active + 1 : 0;
    showSlider();
}

prev.onclick = () => {
    active = active - 1 >= 0 ? active - 1 : countItems - 1;
    showSlider();
}

if (numberDisplay) numberDisplay.innerText = '01';

// Inicializa Slick Carousel
$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 3,
        centerMode: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
    });
});

// --- LÓGICA DOS BOTÕES DO MENU ---
const btnHome = document.getElementById('btn-home');
const btnCars = document.getElementById('btn-cars');

if (btnHome) {
    btnHome.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (btnCars) {
    btnCars.onclick = () => {
        const gallery = document.querySelector('.wrapper');
        if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- LÓGICA DO FALE CONOSCO (BANCO DE DADOS LOCAL) ---
const modal = document.getElementById('contact-modal');
const btnContact = document.getElementById('btn-contact');
const btnClose = document.getElementById('close-modal');
const form = document.getElementById('contact-form');

btnContact.onclick = () => modal.classList.add('open');
btnClose.onclick = () => modal.classList.remove('open');

// Fecha o modal de contato ao clicar fora
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Simula salvar no banco de dados (LocalStorage)
    const newMessage = { name, email, phone, message, date: new Date().toLocaleString() };
    const db_messages = JSON.parse(localStorage.getItem('db_fale_conosco') || '[]');
    db_messages.push(newMessage);
    localStorage.setItem('db_fale_conosco', JSON.stringify(db_messages));

    alert('Mensagem enviada com sucesso! (Salva no LocalStorage)');
    modal.classList.remove('open');
    form.reset();
}

// --- PRELOADER LOGIC ---
window.onload = function () {
    document.body.classList.add('loaded');
}

// --- LÓGICA DO MODAL "SAIBA MAIS" ---
const carDetailsModal = document.getElementById('car-details-modal');
const closeCarModal = document.getElementById('close-car-modal');
const carModalContent = document.getElementById('car-modal-content');
const saibaMaisButtons = document.querySelectorAll('.information');

saibaMaisButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.item');
        const carData = item.dataset;

        carModalContent.innerHTML = `
            <img src="${carData.img}" alt="${carData.marca} ${carData.modelo}">
            <h3>${carData.marca} ${carData.modelo}</h3>
            <table class="specs-table">
                <tr>
                    <td>Motor</td>
                    <td>${carData.motor}</td>
                </tr>
                <tr>
                    <td>Potência</td>
                    <td>${carData.potencia}</td>
                </tr>
                <tr>
                    <td>Torque</td>
                    <td>${carData.torque}</td>
                </tr>
                <tr>
                    <td>0-100 km/h</td>
                    <td>${carData.zeroToHundred}</td>
                </tr>
            </table>
        `;

        carDetailsModal.classList.add('open');
    });
});

if (closeCarModal) closeCarModal.onclick = () => carDetailsModal.classList.remove('open');

// Fecha o modal de detalhes ao clicar fora
if (carDetailsModal) carDetailsModal.addEventListener('click', (e) => { if (e.target === carDetailsModal) carDetailsModal.classList.remove('open'); });

// --- DETALHES EXTRAS (EFEITO PARALLAX E LENS FLARE) ---
const section = document.querySelector('section');

if (section) {
    section.addEventListener('mousemove', (e) => {
        // 1. Efeito Lens Flare (brilho de luz)
        section.style.setProperty('--mouse-x', e.clientX + 'px');
        section.style.setProperty('--mouse-y', e.clientY + 'px');

        // 2. Efeito Parallax na logo da marca
        const activeLogo = document.querySelector('.item.active .brand-logo');
        const x = (window.innerWidth / 2 - e.clientX) / 40; // Movimento sutil
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        if (activeLogo) activeLogo.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// --- PARTICLES.JS CONFIG ---
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
});
