document.getElementById('startRecording').addEventListener('click', () => {
    const count = document.getElementById('playerCount').value;
    if (count > 0) {
        generatePlayerInputs(count);
    }
});

function generatePlayerInputs(count) {
    const container = document.getElementById('playersContainer');
    container.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="player-input">
                <label for="name${i}">Player ${i} Name:</label>
                <input type="text" id="name${i}" required>
                <label for="position${i}">Position:</label>
                <input type="text" id="position${i}" required>
                <label for="stats${i}">Statistics:</label>
                <input type="number" id="stats${i}" required>
                <label for="image${i}">Picture:</label>
                <input type="file" id="image${i}" accept="image/*">
            </div>`;
    }
    document.getElementById('playerInputs').classList.remove('hidden');
}

document.getElementById('generateCards').addEventListener('click', () => {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    const count = document.getElementById('playerCount').value;

    for (let i = 1; i <= count; i++) {
        const name = document.getElementById(`name${i}`).value;
        const position = document.getElementById(`position${i}`).value;
        const stats = document.getElementById(`stats${i}`).value;
        const image = document.getElementById(`image${i}`).files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            cardsContainer.innerHTML += `
                <div class="card">
                    <img src="${e.target.result}" alt="${name}">
                    <h3>${name}</h3>
                    <p>Position: ${position}</p>
                    <p>Stats: ${stats}</p>
                    <p>Rating: ${calculateRating(stats)}</p>
                </div>`;
        };
        if (image) reader.readAsDataURL(image);
    }

    document.getElementById('playerCards').classList.remove('hidden');
});

function calculateRating(stats) {
    return (stats / 100) * 10; // Example: Normalizing stats to a 10-point scale
}

document.getElementById('calculateAverage').addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    let totalStats = 0;

    cards.forEach(card => {
        const stats = parseFloat(card.querySelector('p:nth-child(4)').innerText.split(': ')[1]);
        totalStats += stats;
    });

    const averageStats = totalStats / cards.length;
    const averageCardContainer = document.getElementById('averageCard');
    averageCardContainer.innerHTML = `
        <div class="card">
            <h3>Average Card</h3>
            <p>Stats: ${averageStats.toFixed(2)}</p>
            <p>Rating: ${calculateRating(averageStats).toFixed(2)}</p>
        </div>`;
});
