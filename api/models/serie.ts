import { Obra } from "./filme";

export interface Serie extends Obra {
  qtd_episodios: number;
}
