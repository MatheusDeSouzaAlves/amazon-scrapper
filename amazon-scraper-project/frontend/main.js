const keywordInput = document.getElementById('keyword-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const statusMessage = document.getElementById('status-message');

// Endpoint do backend. Backend deve estar rodando
const API_URL = 'http://localhost:3000/api/scrape';

// Função para exibir os resultados na tela
function displayResults(products) {
    resultsContainer.innerHTML = ''; // Limpa resultados antigos
    
    if (products.length === 0) {
        statusMessage.textContent = 'Nenhum produto encontrado para essa palavra-chave.';
        resultsContainer.appendChild(statusMessage);
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p><strong>Avaliação:</strong> ${product.rating} estrelas</p>
            <p><strong>Número de avaliações:</strong> ${product.reviews}</p>
        `;
        resultsContainer.appendChild(productCard);
    });
}

// Função para fazer a chamada "ajax" para o backend
async function fetchData() {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
        alert('Por favor, digite uma palavra-chave.');
        return;
    }
    
    // Atualiza o status enquanto a busca é realizada
    resultsContainer.innerHTML = '';
    statusMessage.textContent = 'Buscando produtos...';
    resultsContainer.appendChild(statusMessage);

    try {
        const response = await fetch(`${API_URL}?keyword=${encodeURIComponent(keyword)}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
            displayResults(data.products);
        } else {
            statusMessage.textContent = 'Nenhum produto encontrado para essa palavra-chave.';
        }
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        statusMessage.textContent = `Erro: ${error.message}`;
    }
}

// Adiciona o evento de clique ao botão
searchButton.addEventListener('click', fetchData);

// permite buscar ao pressionar Enter no input
keywordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchData();
    }
});