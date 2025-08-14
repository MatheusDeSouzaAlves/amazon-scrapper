import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware para permitir requisições do frontend
app.use(cors());
app.use(express.json());

// Endpoint para realizar o scraping da Amazon
app.get('/api/scrape', async (req, res) => {
  // A palavra-chave de busca é passada como um parâmetro na URL (?keyword=...)
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Parâmetro "keyword" é obrigatório.' });
  }

  console.log(`Iniciando scraping para a palavra-chave: ${keyword}`);

  // URL de busca da Amazon Brasil. Usei encodeURIComponent para garantir que a URL seja segura (estudar mais)
  const amazonUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

  try {
    // Usando axios para fazer a requisição HTTP. Incluí um User-Agent para imitar um navegador. (estudar mais)
    const { data: html } = await axios.get(amazonUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    // Usando JSDOM para criar um ambiente de DOM e analisar o HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const products = [];

    // Selecionando todos os containers de produtos.
    // O seletor pode precisar de ajustes caso a estrutura HTML da Amazon mude.
    const productElements = document.querySelectorAll('div[data-component-type="s-search-result"]');

    if (productElements.length === 0) {
      console.log('Nenhum produto encontrado.');
      return res.status(404).json({ products: [] });
    }

    productElements.forEach(productElement => {
      
      // Extraindo o título do produto
      const titleElement = productElement.querySelector('h2[aria-label] span'); // especificando [aria-label] pois "h2 a span" não é específico o suficiente aparentemente.
      const title = titleElement ? titleElement.textContent.trim() : 'Título não encontrado';


      // Extraindo a avaliação. A string é algo como "4,5 de 5 estrelas"
      const ratingElement = productElement.querySelector('.a-icon-alt');
      const rating = ratingElement ? ratingElement.textContent.trim().split(' ')[0].replace(',', '.') : 'N/A';

      // Extraindo o número de avaliações
      const reviewsElement = productElement.querySelector('span.a-size-base.s-underline-text');
      const reviews = reviewsElement ? reviewsElement.textContent.trim() : '0';

      // Extraindo a URL da imagem
      const imageElement = productElement.querySelector('img.s-image');
      const imageUrl = imageElement ? imageElement.src : 'URL da imagem não encontrada';

      // Adicionando o produto à lista
      products.push({
        title,
        rating: parseFloat(rating) || 0,
        reviews: parseInt(reviews.replace(/,/g, '')) || 0,
        imageUrl,
      });
    });

    console.log(`Scraping concluído. ${products.length} produtos encontrados.`);
    return res.json({ products });
  } catch (error) {
    console.error('Erro durante o scraping:', error.message);
    return res.status(500).json({ error: 'Falha ao buscar dados na Amazon.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});