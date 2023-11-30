import { Response, Request } from "express";
import pool from "../bd";
import { Filme } from "../models/filme";

export class FilmeController {
  public static getFilmes(request: Request, response: Response) {
    pool.query<Filme>("SELECT * FROM Filme", (error, results) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
        return;
      }
      response.status(200).json(results.rows);
    });
  }

  public static getFilmePorId(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query<Filme>(
      "SELECT * FROM Filme WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(200).json(results.rows);
      }
    );
  }

  public static criarFilme(request: Request, response: Response) {
    const {
      id,
      nome,
      duracao,
      sinopse,
      avaliacao = null,
      genero,
    } = request.body;

    pool.query(
      "INSERT INTO Filme (id, nome, duracao, sinopse, avaliacao, genero) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, nome, duracao, sinopse, avaliacao, genero],
      (error) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(201).send("Filme criado com sucesso!");
      }
    );
  }

  public static atualizarFilme(request: Request, response: Response) {
    const { id, nome, duracao, sinopse, avaliacao, genero } = request.body;

    pool.query(
      "UPDATE Filme SET nome = $1, sinopse = $2, duracao = $3, avaliacao = $4, genero = $5 WHERE id = $6",
      [nome, sinopse, duracao, avaliacao, genero, id],
      (error) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(201).send("Filme editado com sucesso!");
      }
    );
  }

  public static excluirFilme(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM Filme WHERE id = $1", [id], (error) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
      }
      response.status(200).send(`Filme de id ${id} deletado com sucesso!`);
    });
  }

  public static getFilmesComGenero(request: Request, response: Response) {
    pool.query<Filme>("SELECT * FROM vw_filme_genero", (error, results) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
      }
      response.status(200).json(results.rows);
    });
  }
}
