// dependencies
import React, { useState, FormEvent } from 'react';

// icons
import { FiChevronRight } from 'react-icons/fi';

// api
import api from '../../services/api';

// logos
import logo from '../../assets/logo.svg';

// styles
import { Title, Form, Repositories } from './styles';

// interfaces
interface Repository {
  full_name: string;
  description: string;
  owner: {
    loging: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositorios no github</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do Repositorio"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/21126750?v=4"
            alt="Lupebreak"
          />
          <div>
            <strong>LuPeBreak/Estudos</strong>
            <p>Repositorio para salvar estudos do curso Gostack</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
