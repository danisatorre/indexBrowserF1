const API_KEY = '(YOUR API KEY)';
const API_URL = `https://newsapi.org/v2/everything?q=Formula%201&language=es&sortBy=publishedAt&apiKey=${API_KEY}`;

async function fetchF1News() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las noticias');
    }
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('news-container').innerHTML = '<p>No se pudieron cargar las noticias.</p>';
  }
}

function displayNews(articles) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'news-article';
    articleElement.innerHTML = `
      <div class="article">
        <img src="${article.urlToImage || 'images/f1Logo.png'}" alt="${article.title}" class="news-image">
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || 'Sin descripción disponible.'}</p>
        <small>Fuente: ${article.source.name}</small>
      </div>
    `;
    const articleDiv = articleElement.querySelector('.article');
    articleDiv.addEventListener('click', () => {
      window.location.href = article.url;
    });
    container.appendChild(articleElement);
  });
}

fetchF1News();