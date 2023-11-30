import { Request, Response } from "express";
import pool from "../bd";
import { Plano } from "../models/plano";

export class PlanoController {
  public static getPlanos(request: Request, response: Response) {
    pool.query<Plano>("SELECT * FROM Plano", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  public static getPlanoPorId(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query<Plano>(
      "SELECT * FROM Plano WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }

        response.status(200).json(results.rows);
      }
    );
  }

  public static criarPlano(request: Request, response: Response) {
    const { id, qtd_conexoes, preco, descricao } = request.body;

    pool.query(
      "INSERT INTO Plano (id, qtd_conexoes, preco, descricao) VALUES ($1, $2, $3, $4)",
      [id, qtd_conexoes, preco, descricao],
      (error) => {
        if (error) {
          throw error;
        }

        response.status(201).send("Plano criado com sucesso!");
      }
    );
  }

  public static atualizarPlano(request: Request, response: Response) {
    const { id, qtd_conexoes, preco, descricao } = request.body;

    pool.query(
      "UPDATE Plano SET qtd_conexoes = $1, descricao = $2, preco = $3 WHERE id = $4",
      [qtd_conexoes, descricao, preco, id],
      (error) => {
        if (error) {
          throw error;
        }

        response.status(201).send("Plano editado com sucesso!");
      }
    );
  }

  public static excluirPlano(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM Plano WHERE id = $1", [id], (error) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Plano de id ${id} deletado com sucesso!`);
    });
  }
}
