import {Status} from "./status";

export class Servico {

  id?: number;
  nome: string;
  dataInicio: string;
  dataConclusao: string;
  status: Status;
  descricao: string;
  imagem?: string;
  veiculo: string;

  constructor(titulo: string, dataIni: string, dataCon: string, desc: string, veiculo: string,
              sta: Status, id?: number, imagem?: string) {
    this.nome= titulo;
    this.dataInicio= dataIni;
    this.dataConclusao = dataCon;
    this.descricao= desc;
    this.veiculo = veiculo;
    this.status = sta;
    this.id = id;
    this.imagem = imagem;
  }

}
