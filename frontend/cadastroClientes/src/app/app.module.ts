import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ListClientComponent } from './list-client/list-client.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    NavBarComponent,
    ListClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
