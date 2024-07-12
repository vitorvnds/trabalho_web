import { Injectable } from '@angular/core';
import {Servico} from "../model/servico";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class ServicoServiceService extends Dexie {
  servicos: Dexie.Table<Servico,number>;

  constructor() {
    super('ServicoDB');
    this.version(1).stores({
      servicos: '++id, nome, veiculo, dataInicio, dataConclusao, status, descricao, imagem',
    });
    this.servicos = this.table('servicos');
  }

  async adicionarServico(servico: Servico): Promise<number> {
    return await this.servicos.add(servico);
  }

  async buscarServico(): Promise<Servico[]>{
    return await this.servicos.toArray();
  }

  async removerServico(id:number): Promise<void>{
    return await this.servicos.delete(id);
  }

  async atualizarServico(id: number, servico: Servico): Promise<number>{
    return await this.servicos.update(id, servico);
  }
}
