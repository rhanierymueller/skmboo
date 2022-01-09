import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { ClienteService } from '../cliente.service';  
import { Cliente } from '../cliente';
import serviceViacep from "@postalcode/service-viacep";


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
  mensagemErroNome: string;
  mensagemErroEmail: string;
  mensagemErroCep: string;
  cepCompleto: any;

 endCompleto: any;
 
 endCompleto2: {
  "postalcode": "",
  "state": "",
  "city": "",
  "neighborhood": "",
  "street": "",
  "service": ""
}
 

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
    this.dataSaved = false;  
    const cliente = this.clienteForm.value;  
    this.CreateCliente(cliente);  
    this.clienteForm.reset();  
  } 

  CreateCliente(cliente: Cliente) {  
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



  onBlurEventName(event: any) {
    this.mensagemErroNome = (event.target.value.length < 3) ? (this.mensagemErroNome = 'Nome deve ter no mínimo 3 caracteres.') :
    ((event.target.value.length > 80) ? ( this.mensagemErroNome = 'Nome deve ter no máximo 80 caracteres.') :  this.mensagemErroNome = '');
  }

  onBlurEventEmail(event: any) {
    this.mensagemErroEmail = (/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(event.target.value) ? this.mensagemErroEmail = '' :
    this.mensagemErroEmail = 'Formato de email inválido');
  }

  async buscarCepUsuario(cep: string){
    const viaCep = new serviceViacep();
    viaCep.name;
    viaCep.type;
    viaCep.country;
    viaCep.codeLength;
    //viaCep.get(cep).then((cep) => this.cepCompleto = cep );

    this.endCompleto = await viaCep.get(cep);
    this.cepCompletoFunc(this.endCompleto)
  }




  onBlurEventCEP(event: any) {
    
  event.target.value.length == 8 ? (this.mensagemErroCep = '', this.buscarCepUsuario((event.target.value))) : (this.mensagemErroCep = 'Cep inválido')
  }


   cepCompletoFunc(cep: any) {
   this.endCompleto2 = cep;

   this.clienteForm.Logradouro = this.endCompleto2.street;

   this.clienteForm = this.formbulider.group({  
    Logradouro: [this.endCompleto2.street],  
    Bairro: [this.endCompleto2.neighborhood],  
    Cidade: [this.endCompleto2.city],
    UF: [this.endCompleto2.state]
  });  
  //this.loadAllCliente();
  }

   
}
  
