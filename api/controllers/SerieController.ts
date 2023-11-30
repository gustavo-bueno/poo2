import { Request, Response } from "express";
import pool from "../bd";
import { Serie } from "../models/serie";

export class SerieController {
  public static getSeries(request: Request, response: Response) {
    pool.query<Serie>("SELECT * FROM Serie", (error, results) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
        return;
      }

      response.status(200).json(results.rows);
    });
  }

  public static getSeriePorId(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query<Serie>(
      "SELECT * FROM Serie WHERE id = $1",
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

  public static criarSerie(request: Request, response: Response) {
    const { id, nome, qtd_episodios, sinopse, avaliacao, genero } =
      request.body;

    pool.query(
      "INSERT INTO Serie (id, nome, qtd_episodios, sinopse, avaliacao, genero) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, nome, qtd_episodios, sinopse, avaliacao, genero],
      (error) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(201).send("Serie criado com sucesso!");
      }
    );
  }

  public static atualizarSerie(request: Request, response: Response) {
    const { id, nome, qtd_episodios, sinopse, avaliacao, genero } =
      request.body;

    pool.query(
      "UPDATE Serie SET nome = $1, sinopse = $2, qtd_episodios = $3, avaliacao = $4, genero = $5 WHERE id = $6",
      [nome, sinopse, qtd_episodios, avaliacao, genero, id],
      (error) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(201).send("Serie editado com sucesso!");
      }
    );
  }

  public static excluirSerie(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM Serie WHERE id = $1", [id], (error) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
        return;
      }
      response.status(200).send(`Serie de id ${id} deletado com sucesso!`);
    });
  }

  public static getSeriesComGenero(request: Request, response: Response) {
    pool.query<Serie>("SELECT * FROM vw_serie_genero", (error, results) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
        return;
      }
      response.status(200).json(results.rows);
    });
  }
}
