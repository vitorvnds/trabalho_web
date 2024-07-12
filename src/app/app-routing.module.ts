import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaginaInicialComponent} from "./componentes/pagina-inicial/pagina-inicial.component";
import {VisualizarTarefasComponent} from "./componentes/visualizar-tarefas/visualizar-tarefas.component";
import {VisualizarServicoComponent} from "./componentes/visualizar-servico/visualizar-servico.component";
import {LoginComponent} from "./componentes/login/login.component";
import {FaleConoscoComponent} from "./componentes/fale-conosco/fale-conosco.component";

const routes: Routes = [
  { path: "", redirectTo: "pagina-inicial", pathMatch: "full" },
  { path: "pagina-inicial", component: PaginaInicialComponent },
  { path: "visualizar-tarefas", component: VisualizarTarefasComponent },
  { path: "visualizar-servico", component: VisualizarServicoComponent },
  { path: "login", component: LoginComponent },
  { path: "fale-conosco", component: FaleConoscoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
