import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListClientComponent } from './list-client/list-client.component';

const routes: Routes = [
  {path: 'cadastro-cliente', component: CadastroClienteComponent},
  {path: 'list-client', component: ListClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
