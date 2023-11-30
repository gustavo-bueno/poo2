import pool from "../bd";
import { Request, Response } from "express";

export class BackupController {
  public static async getMoviesBackup(request: Request, response: Response) {
    pool.query("SELECT * FROM Backup_filme", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  public static async getSeriesBackup(request: Request, response: Response) {
    pool.query("SELECT * FROM Backup_serie", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
}
