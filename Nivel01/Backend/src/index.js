const express = require('express');
const { v4,validate } = require('uuid');
const cors = require('cors');


const app = express();

/**
 * 
 * Metodos HTTP
 * 
 * GET: Buscar informaçoes do backend
 * POST: Criar uma informaçao no backend
 * PUT/PATCH: Alterar uma informaçao no backend
 * DELETE: Deletar uma informaçao no backend
 * 
 */

/**
 * 
 * Tipos de Parametros
 * 
 * Query Params: Filtros e paginaçao
 * Route Params: Identificar recursos na hora de atualizar ou deletar
 * Request Params: Identificar recursos na hora de atualizar ou deletar
 * 
 */

 /**
  * 
  * Middleware:
  *   
  * Interceptador de requisiçoes que pode
  * interromper a requisiçao
  * ou alterar dados da requisiçao.
  * 
  */
app.use(cors());
app.use(express.json());

const projects = [];


//muddlewares
function logRequests(request,response,next){
  const {method, url} = request;

  const logLabel= `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next();
}
function verifyID(request,response,next){
  const {id} = request.params;

  if(!validate(id)){
    return response.status(400).json({message:"invalid id"});
  }
  return next();
}

//iniciando middlewares gerais
app.use(logRequests)
app.use('/projects/:id',verifyID);

//rotas
app.get('/projects', (request, response) => {

  const {title} = request.query

  const results = title
    ? projects.filter(project=> project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const {
    title,
    owner
  } = request.body;

  const project = {
    id: v4(),
    title,
    owner
  }

  projects.push(project);

  return response.json(project)
});

app.put('/projects/:id', (request, response) => {
  const {
    id
  } = request.params;
  const {
    title,
    owner
  } = request.body;


  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({
      error: "project not found"
    })
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id',(request, response) => {
  const {
    id
  } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({
      error: "project not found"
    })
  }

  projects.splice(projectIndex,1);

  return response.json({
    Message: "Project Deleted"
  });
});

app.listen(3333, () => {
  console.log("😁 Back-end Iniciado")
});