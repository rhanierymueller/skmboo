import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { ClienteService } from '../cliente.service';  
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  dataSaved = false;  
  clienteForm: any;  
  allClientes: Observable<Cliente[]>;  
  clienteIdUpdate: any;  
  message = '';

  constructor(private formbulider: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteForm = this.formbulider.group({  
      Nome: ['', [Validators.required]],  
      Email: ['', [Validators.required]], 
      Data_Cadastro: ['', [Validators.required]],  
      Cpf_Cnpj: ['', [Validators.required]],
      Data_Nascimento: ['', [Validators.required]],  
      Tipo: ['', [Validators.required]],
      Telefone: ['', [Validators.required]],  
      Cep: ['', [Validators.required]],
      Logradouro: ['', [Validators.required]],  
      Numero: ['', [Validators.required]],
      Bairro: ['', [Validators.required]],  
      Complemento: ['', [Validators.required]],
      Cidade: ['', [Validators.required]],
      UF: ['', [Validators.required]]
    });  
    //this.loadAllCliente();  
  }

  onFormSubmit(value: any) {  
    console.log("caiu aqui");
    console.log(value);
    this.dataSaved = false;  
    const cliente = this.clienteForm.value;  
    this.CreateCliente(cliente);  
    this.clienteForm.reset();  
  } 

  CreateCliente(cliente: Cliente) {  
    console.log(cliente, 'cliente');
    if (this.clienteIdUpdate == null) {  
      this.clienteService.createCliente(cliente).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Registro salvo com sucesso';  
          //this.loadAllClientes();  
          this.clienteIdUpdate = null;  
          this.clienteForm.reset();  
        }  
      );  
    } else {  
      cliente.Id = this.clienteIdUpdate;  
      this.clienteService.putUpdateCliente(this.clienteIdUpdate, cliente).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Registro atualizado com sucesso';  
        //this.loadAllCliente();  
        this.clienteIdUpdate = null;  
        this.clienteForm.reset(); 
      });  
    }  
  }

  // loadClienteToEdit(alunoid: string) {  
  //   this.clienteService.getAlunoById(alunoid).subscribe(aluno=> {  
  //     this.message = null;  
  //     this.dataSaved = false;  
  //     this.alunoIdUpdate = aluno.alunoId;  
  //     this.alunoForm.controls['Nome'].setValue(aluno.nome);  
  //     this.alunoForm.controls['Email'].setValue(aluno.email);  
  //   });    
  // }

  // deleteAluno(alunoid: string) {  
  //   if (confirm("Deseja realmente deletar este aluno ?")) {   
  //     this.alunoService.deleteAlunoById(alunoid).subscribe(() => {  
  //       this.dataSaved = true;  
  //       this.message = 'Registro deletado com sucesso';  
  //       this.loadAllAlunos();  
  //       this.alunoIdUpdate = null;  
  //       this.alunoForm.reset();  
  //     });  
  //   }  
  // } 

  resetForm() {  
    this.clienteForm.reset();  
    this.message = '';  
    this.dataSaved = false;  
  } 
}
  
