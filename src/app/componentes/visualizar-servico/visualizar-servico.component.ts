import { Component, OnInit } from '@angular/core';
import {ServicoServiceService} from "../../app-core/servicos/servico-service.service";
import {Servico} from "../../app-core/model/servico";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-servico',
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.css']
})
export class VisualizarServicoComponent implements OnInit {

  i: number =0;
  servicos: any [] =[];
  servicoVisualizar: any;
  form: FormGroup;
  constructor(private servicoServiceService: ServicoServiceService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      nomeServico: ['', Validators.required],
      dataInicioServico: ['', Validators.required],
      dataConclusaoServico: ['', Validators.required],
      statusServico: ['', Validators.required],
      descricaoServico: ['', Validators.required],
      veiculoServico: ['', Validators.required],
      id: [0],
      imagem: ['']
    });
  }

  openModal(){
    $('#add-servico').modal('show');
  }
  closeModal(){
    $('#add-servico').modal('hide');
  }
  salvarFormServico() {
    if(this.form.valid){
      const novoServico: Servico = new Servico(
        this.form.value.nomeServico,
        this.form.value.dataInicioServico,
        this.form.value.dataConclusaoServico,
        this.form.value.descricaoServico,
        this.form.value.statusTarefa,
        this.form.value.veiculoServico,
        this.form.value.imagem
      );
      console.log('dados do novo servico: ',novoServico);
      this.servicoServiceService.adicionarServico(novoServico).then(resposta => {
        if(resposta > 0){
          Swal.fire('Sucesso', 'Servico salvo com sucesso!', 'success');
          this.form.reset();
          this.closeModal();
          this.listarServicos();
        }
      }).catch(respostaError => {
        Swal.fire('Erro', 'Não foi possível salvar o serviço, tente novamente', 'error');
        console.log(respostaError);
      })
    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS.");
      console.log("DADOS DOS CAMPOS: ", this.form.value);
      Swal.fire('Antenção', 'Alguns campos do formulário não estão corretos.', 'warning');
      this.marcarTodosComoClicados();
    }
  }
  isCampoValido(inputNome: string) : boolean {
    const campo: any = this.form.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }
  marcarTodosComoClicados(){
    Object.values(this.form.controls).forEach(campo => {
      campo.markAsTouched();
    });
  }
  listarServicos(){
    this.servicoServiceService.buscarServico().then(resposta => {
      this.servicos= resposta;
    });
  }

  setServicoAtual(servico: Servico){
    this.servicoVisualizar= servico;
  }

  excluirServico(id: number){
    Swal.fire(
      {
        title: 'Tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar serviço!',
        confirmButtonColor: '#3085d6'
      }).then((tipoBotao) => {
      if(tipoBotao.isConfirmed){
        this.servicoServiceService.removerServico(id).then(() => {
          Swal.fire('Deletado!', 'O serviço foi deletado.', 'success');
          this.listarServicos();
        });
      }
    }).catch(error => {
      console.log(error);
      Swal.fire('ERRO!', 'O serviço não foi deletado.', 'error')
    });
  }

  submitForm(){
    if(this.form.value.id > 0){
      this.editarFormServico();
    }else{
      this.salvarFormServico();
    }
  }
  carregarDadosServico(servicoEditar: Servico){
    this.form.patchValue({
      nomeServico: servicoEditar.nome,
      dataInicioServico: servicoEditar.dataInicio,
      dataConclusaoServico: servicoEditar.dataConclusao,
      statusServico: servicoEditar.status,
      descricaoServico: servicoEditar.descricao,
      veiculoServico: servicoEditar.veiculo,
      id: servicoEditar.id,
      imagem: servicoEditar.imagem
    });
    this.openModal();
  }

  editarFormServico(){
    if(this.form.valid){
      const editarServico: Servico = new Servico(
        this.form.value.nomeServico,
        this.form.value.dataInicioServico,
        this.form.value.dataConclusaoServico,
        this.form.value.descricaoServico,
        this.form.value.veiculoServico,
        this.form.value.statusServico,
        this.form.value.id,
        this.form.value.imagem
      );
      this.servicoServiceService.atualizarServico(this.form.value.id, editarServico)
        .then(resposta => {
          if(resposta === 1){
            Swal.fire('Sucesso!','Servico editado com sucesso.','success');
            this.form.reset();
            this.closeModal();
            this.listarServicos();
          }else{
            Swal.fire('Atenção','Nenhum serviço encontrado, ou nenhuma alteração necessária', 'info');
          }
        }).catch(error => {
        Swal.fire('Atenção!', 'Não foi possível editar o serviço.', 'error');
      });
    }else{
      Swal.fire('Atenção!', 'Alguns campos estão incorretos', 'warning');
      this.marcarTodosComoClicados();
    }
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.form.patchValue({imagem: loadEvent?.target?.result});
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.listarServicos();
  }

}
