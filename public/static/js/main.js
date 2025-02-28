document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('root');
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'container mx-auto px-4 py-8';
    
    // Add title
    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold text-center mb-8';
    title.textContent = 'Idea Repository';
    
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mb-8';
    
    // Create form
    const form = document.createElement('form');
    form.innerHTML = `
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="ideaName">
                Idea Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   id="ideaName" type="text" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="ideaDifficulty">
                Difficulty (1-10)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   id="ideaDifficulty" type="number" min="1" max="10" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="ideaAuthors">
                Authors (comma-separated)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   id="ideaAuthors" type="text" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="ideaDescription">
                Description
            </label>
            <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="ideaDescription" required></textarea>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                type="submit">
            Submit Idea
        </button>
    `;
    
    // Create get random idea button
    const randomButton = document.createElement('button');
    randomButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4';
    randomButton.textContent = 'Get Random Idea';
    
    // Create result container
    const resultContainer = document.createElement('div');
    resultContainer.className = 'mt-8 bg-white rounded-xl shadow-md p-6 hidden';
    
    // Add elements to the page
    formContainer.appendChild(form);
    formContainer.appendChild(randomButton);
    container.appendChild(title);
    container.appendChild(formContainer);
    container.appendChild(resultContainer);
    app.appendChild(container);
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const ideaData = {
            ideaName: document.getElementById('ideaName').value,
            ideaDifficulty: parseInt(document.getElementById('ideaDifficulty').value),
            ideaAuthors: document.getElementById('ideaAuthors').value.split(',').map(author => author.trim()),
            ideaDescription: document.getElementById('ideaDescription').value
        };
        
        try {
            const response = await fetch('/api/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ideaData)
            });
            
            if (response.ok) {
                form.reset();
                alert('Idea submitted successfully!');
            } else {
                alert('Error submitting idea');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting idea');
        }
    });
    
    // Handle random idea button click
    randomButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/ideas/random');
            const idea = await response.json();
            
            resultContainer.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${idea.ideaName}</h2>
                <p class="mb-2"><strong>Difficulty:</strong> ${idea.ideaDifficulty}/10</p>
                <p class="mb-2"><strong>Authors:</strong> ${idea.ideaAuthors.join(', ')}</p>
                <p class="mb-2"><strong>Description:</strong> ${idea.ideaDescription}</p>
            `;
            resultContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching random idea');
        }
    });
});
