export default interface IConsoleCriar {
  nome: string;
  valor: number;
  dono: string;
  estado: string;
  observacao: string;
  disponivel: boolean;
}

export interface IConsoleAtualizar {
  id: string;
  nome: string;
  valor: number;
  dono: string;
  estado: string;
  observacao: string;
  disponivel: boolean;
}
