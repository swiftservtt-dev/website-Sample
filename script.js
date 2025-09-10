
let currentCarouselIndex = 0;
let carouselTimer;
const carouselInterval = 5000;

function showNextCarouselItem() {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    items[currentCarouselIndex].classList.remove('active');
    currentCarouselIndex = (currentCarouselIndex + 1) % items.length;
    items[currentCarouselIndex].classList.add('active');
}
function startCarousel() {
    stopCarousel();
    carouselTimer = setInterval(showNextCarouselItem, carouselInterval);
}
function stopCarousel() {
    if (carouselTimer) clearInterval(carouselTimer);
}

// Modal
function showMessageModal(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}
function closeModal() {
    document.getElementById('messageModal').style.display = 'none';
}
window.onclick = function(event) {
    const modal = document.getElementById('messageModal');
    if (event.target == modal) closeModal();
}

// Contact Form
function submitContactForm(event) {
    event.preventDefault();
    showMessageModal('Your message has been sent successfully!');
    event.target.reset();
}

// Property Details (localStorage)
function saveProperty(type, property) {
    localStorage.setItem(type + 'Property', JSON.stringify(property));
    window.location.href = type + '-details.html';
}
function loadProperty(type) {
    const data = localStorage.getItem(type + 'Property');
    if (!data) return;
    const property = JSON.parse(data);
    document.getElementById('propertyTitle').textContent = property.title;
    document.getElementById('propertyPrice').textContent = property.price;
    document.getElementById('propertyImage').src = property.image;
    document.getElementById('propertyDescription').textContent = property.description;
    const featuresList = document.getElementById('propertyFeatures');
    featuresList.innerHTML = '';
    property.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        featuresList.appendChild(li);
    });
}
