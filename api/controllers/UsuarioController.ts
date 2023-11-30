import { Request, Response } from "express";
import pool from "../bd";
import { Usuario } from "../models/usuario";

export class UsuarioController {
  public static getUsuarios(request: Request, response: Response) {
    pool.query<Usuario>("SELECT * FROM Usuario", (error, results) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
        return;
      }
      response.status(200).json(results.rows);
    });
  }

  public static getUsuarioPorEmail(request: Request, response: Response) {
    const { email } = request.params;

    pool.query<Usuario>(
      "SELECT * FROM Usuario WHERE email = $1",
      [email],
      (error, results) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(200).json(results.rows);
      }
    );
  }

  public static criarUsuario(request: Request, response: Response) {
    const { nome, email, senha, planoId } = request.body;

    pool.query(
      "INSERT INTO Usuario (nome, email, senha, plano) VALUES ($1, $2, $3, $4)",
      [nome, email, senha, planoId],
      (error) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(201).send("Usuário criado com sucesso!");
      }
    );
  }

  public static atualizarUsuario(request: Request, response: Response) {
    const { nome, email, senha, planoId } = request.body;

    pool.query(
      "UPDATE Usuario SET nome = $1, email = $2, senha = $3, plano = $4 WHERE email = $2",
      [nome, email, senha, planoId],
      (error) => {
        if (error) {
          response.status(500).send("Um erro aconteceu");
          return;
        }

        response.status(201).send("Usuário editado com sucesso!");
      }
    );
  }

  public static excluirUsuario(request: Request, response: Response) {
    const { email } = request.params;

    pool.query("DELETE FROM Usuario WHERE email = $1", [email], (error) => {
      if (error) {
        response.status(500).send("Um erro aconteceu");
        return;
      }
      response.status(200).send(`User deleted with Email: ${email}`);
    });
  }
}
