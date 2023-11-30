import { Request, Response } from "express";
import pool from "../bd";
import { Genero } from "../models/genero";

export class GeneroController {
  public static getGeneros(request: Request, response: Response) {
    pool.query<Genero>("SELECT * FROM Genero", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  public static getGeneroPorId(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query<Genero>(
      "SELECT * FROM Genero WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }

        response.status(200).json(results.rows);
      }
    );
  }

  public static criarGenero(request: Request, response: Response) {
    const { nome, id, descricao } = request.body;

    pool.query(
      "INSERT INTO Genero (id, nome, descricao) VALUES ($1, $2, $3)",
      [id, nome, descricao],
      (error) => {
        if (error) {
          throw error;
        }

        response.status(201).send("Gênero criado com sucesso!");
      }
    );
  }

  public static atualizarGenero(request: Request, response: Response) {
    const { nome, descricao, id } = request.body;

    pool.query(
      "UPDATE Genero SET nome = $1, descricao = $2 WHERE id = $3",
      [nome, descricao, id],
      (error) => {
        if (error) {
          throw error;
        }

        response.status(201).send("Gênero editado com sucesso!");
      }
    );
  }

  public static excluirGenero(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM Genero WHERE id = $1", [id], (error) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Gênero de id ${id} deletado com sucesso!`);
    });
  }
}
