import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { UsuarioController } from "./controllers/UsuarioController";
import { GeneroController } from "./controllers/GeneroController";
import { PlanoController } from "./controllers/PlanoController";
import { FilmeController } from "./controllers/FilmeController";
import { SerieController } from "./controllers/SerieController";
import { BackupController } from "./controllers/BackupController";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Projeto disciplina POO 2" });
});

// Usuários
app.get("/users", UsuarioController.getUsuarios);
app.get("/users/:email", UsuarioController.getUsuarioPorEmail);
app.post("/users", UsuarioController.criarUsuario);
app.put("/users", UsuarioController.atualizarUsuario);
app.delete("/users/:email", UsuarioController.excluirUsuario);

// Gêneros
app.get("/genres", GeneroController.getGeneros);
app.get("/genres/:id", GeneroController.getGeneroPorId);
app.post("/genres", GeneroController.criarGenero);
app.put("/genres", GeneroController.atualizarGenero);
app.delete("/genres/:id", GeneroController.excluirGenero);

// Planos
app.get("/plans", PlanoController.getPlanos);
app.get("/plans/:id", PlanoController.getPlanoPorId);
app.post("/plans", PlanoController.criarPlano);
app.put("/plans", PlanoController.atualizarPlano);
app.delete("/plans/:id", PlanoController.excluirPlano);

// Filmes
app.get("/movies", FilmeController.getFilmes);
app.get("/movies/:id", FilmeController.getFilmePorId);
app.post("/movies", FilmeController.criarFilme);
app.put("/movies", FilmeController.atualizarFilme);
app.delete("/movies/:id", FilmeController.excluirFilme);

// Séries
app.get("/series", SerieController.getSeries);
app.get("/series/:id", SerieController.getSeriePorId);
app.post("/series", SerieController.criarSerie);
app.put("/series", SerieController.atualizarSerie);
app.delete("/series/:id", SerieController.excluirSerie);

// Backup
app.get("/backup/movies", BackupController.getMoviesBackup);
app.get("/backup/series", BackupController.getSeriesBackup);

// Views
app.get("/views/movies", FilmeController.getFilmesComGenero);
app.get("/views/series", SerieController.getSeriesComGenero);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
