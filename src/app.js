const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid Repository ID'})
  }

  return next();
}

app.use('/repositories/:id', validateRepositoryId);


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});


app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = { 
    id: uuid(), 
    title,
    url,
    techs,
    likes: 0
  }
  
  repositories.push(repository);
  return response.json(repository);

});



app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const reposistyIndex = repositories.findIndex(repository => repository.id === id);

  if (reposistyIndex < 0) {
    return response.status(400).json({error: 'Repository does not exist'});
  } 
  
  const repository = { ...repositories[reposistyIndex], title, url, techs }

  repositories[reposistyIndex] = repository;

  return response.json(repository);


});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const reposistyIndex = repositories.findIndex(repository => repository.id === id);

  if (reposistyIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'});
  }

  repositories.splice(reposistyIndex, 1);
  return response.status(204).send();

});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const reposistyIndex = repositories.find(repository => repository.id === id);

  if (!reposistyIndex) {
    return response.status(400).send().json({ error: 'Likes does not exist'});
  } 
  
  reposistyIndex.likes++;

  return response.json(reposistyIndex);
});

module.exports = app;
