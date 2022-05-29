export interface IUsuarioAtualizar {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: number;
  senha: string;
  pendencia: boolean;
}

export interface IUsuarioCriar {
  nome: string;
  cpf: string;
  email: string;
  telefone: number;
  senha: string;
  pendencia: boolean;
}

export interface IUsuarioCriarTwo {
  nome: string;
  cpf: string;
  email: string;
  telefone: number;
  senha: string;
  pendencia: boolean;
  carrinho: Array<any>[];
}
