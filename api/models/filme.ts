export interface Obra {
  id: number;
  nome: string;
  avaliacao: number;
  sinopse: string;
  genero: number;
}

export interface Filme extends Obra {
  duracao: number;
}
