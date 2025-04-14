// Database simulation (in a real app, this would be a SQL database)
let petsDatabase = [];

// DOM elements
const petsContainer = document.querySelector('.pets-container');
const petForm = document.getElementById('pet-form');

// Display pets
function displayPets() {
    petsContainer.innerHTML = '';

    petsDatabase.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';

        petCard.innerHTML = `
            <img src="${pet.photo}" alt="${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p>Type: ${pet.type}</p>
                <p>Age: ${pet.age} years</p>
                <p>${pet.description}</p>
                <p><small>Contact: ${pet.ownerEmail}</small></p>
                <p>location: ${pet.location}</p>
                <button onclick="adoptPet(${pet.id})">I want to adopt!</button>
            </div>
        `;

        petsContainer.appendChild(petCard);
    });
}

// Handle form submission
petForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('pet-name').value;
    const type = document.getElementById('pet-type').value;
    const age = document.getElementById('pet-age').value;
    const description = document.getElementById('pet-description').value;
    const ownerEmail = document.getElementById('owner-email').value;
    const photoInput = document.getElementById('pet-photo');
    const location = document.getElementById('pet-location').value;

    // Simple photo handling (in a real app, you'd upload to a server)
    let photo = 'https://via.placeholder.com/300';
    if (photoInput.files && photoInput.files[0]) {
        photo = URL.createObjectURL(photoInput.files[0]);
    }

    const newPet = {
        id: Date.now(), // Simple unique ID
        name,
        type,
        age,
        description,
        photo,
        location,
        ownerEmail
    };

    petsDatabase.push(newPet);
    displayPets();
    petForm.reset();
});

// Adoption function
function adoptPet(petId) {
    const pet = petsDatabase.find(p => p.id === petId);
    if (pet) {
        const subject = `Adoption interest for ${pet.name}`;
        const body = `Hello,\n\nI'm interested in adopting ${pet.name}. Please contact me with more information.\n\nBest regards,`;

        // Create mailto link
        window.location.href = `mailto:${pet.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // In a real app, you would store adoption requests in the database
    }
}

// Initial display
displayPets();