import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api
    .get('repositories')
    .then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `${Date.now()} Novo repositório`,
      url: 'xxx',
      techs: ['ReactJS', 'React Native']
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
  await api.delete(`/repositories/${id}`);

    const repositoryFiltered = repositories.filter(repository => repository.id !== id);

    setRepository(repositoryFiltered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length
        ? repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))
        : ''}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
