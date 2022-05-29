export interface IEnderecoAtualizar {
  id: string;
  cidade: string;
  estado: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento: string;
}

export interface IEnderecosCriar {
  cidade: string;
  estado: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  usuarioId: any;
}
