# Amazon Scraper

Este projeto é uma aplicação simples de scraping da Amazon, desenvolvida com Bun no backend e Vite no frontend. Ele permite buscar produtos na Amazon.com.br por uma palavra-chave e exibe os resultados na tela.

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

-   `backend/`: Contém a API que realiza o scraping.
-   `frontend/`: Contém a interface do usuário.

## Pré-requisitos

Para executar este projeto, você precisa ter o [Bun](https://bun.sh/) instalado. Ele gerenciará todas as dependências e a execução dos scripts.

## Instalação e Execução

Siga os passos abaixo para configurar e executar a aplicação.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/amazon-scraper-project.git](https://github.com/seu-usuario/amazon-scraper-project.git)
    cd amazon-scraper-project
    ```

2.  **Instale as dependências:**
    Você precisará instalar as dependências de cada parte do projeto.

    -   **Para o backend:**
        ```bash
        cd backend
        bun install
        ```
    -   **Para o frontend:**
        ```bash
        cd ../frontend
        bun install
        ```

3.  **Execute o backend e o frontend:**
    Você precisará rodar os dois servidores em terminais separados.

    -   **Inicie o backend:**
        ```bash
        cd backend
        bun run dev
        ```
        O servidor do backend estará rodando em `http://localhost:3000`.

    -   **Inicie o frontend:**
        ```bash
        cd ../frontend
        bun run dev
        ```
        O servidor do frontend (Vite) estará rodando em `http://localhost:5173` ou em uma porta similar.

4.  **Acesse a aplicação:**
    Abra o seu navegador e acesse o endereço do frontend (normalmente `http://localhost:5173`). Digite uma palavra-chave no campo de busca e clique no botão para ver os resultados.

## Tecnologias Utilizadas

-   **Backend**: [Bun](https://bun.sh/), [Express](https://expressjs.com/), [Axios](https://axios-http.com/), [JSDOM](https://www.npmjs.com/package/jsdom)
-   **Frontend**: [Vite](https://vitejs.dev/), HTML, CSS, JavaScript