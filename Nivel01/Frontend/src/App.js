//dependencies
import React,{useState, useEffect} from 'react';


//components
import Header from './Components/header';

//css
import './App.css'

//api
import api from './services/api';

/**
 * 
 * Components
 * Propriedades
 * Estado e imutabilidade
 */

function App(){

  const [projects , setProjects] = useState([]);

  useEffect(()=>{
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  },[]);

  async function handleAddProject () {
    const response = await api.post('projects', {
      "title":`novo Projeto ${Date.now()}`,
      "owner":"luis"
    });

    const project = response.data;
    
    setProjects( [...projects,project] );
  }

  return (
    <>
      <Header title="hello world"/>

      <ul>
        {projects.map(project=> <li key={project.id}>{project.title}</li> )}
      </ul>

      <button type="button" onClick={handleAddProject} >criar projeto</button>
    </>
  );
}

export default App;