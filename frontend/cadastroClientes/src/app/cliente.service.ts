import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Cliente } from './cliente';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'https://localhost:44375/';  


  constructor(private http: HttpClient) { }

  getListCliente(): Observable<Cliente[]> {  
    return this.http.get<Cliente[]>(this.url);  
  }  

  getClienteById(clienteid: string): Observable<Cliente> {  
    const apiurl = `${this.url}/${clienteid}`;
    return this.http.get<Cliente>(apiurl);  
  } 

  createCliente(cliente: Cliente): Observable<Cliente> {
        const TOKEN = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
          "Authorization": "Bearer " + TOKEN,
          "Content-Type": "application/json"
      })
    };  
    return this.http.post<Cliente>(this.url + 'cliente/registrarcliente', cliente);  
  }

  putUpdateCliente(clienteid: string, cliente: Cliente): Observable<Cliente> {  
    const apiurl = `${this.url}/${clienteid}`;
    return this.http.put<Cliente>(apiurl, cliente, httpOptions);  
  }
    
  // deleteAlunoById(alunoid: string): Observable<number> {  
  //   const apiurl = `${this.url}/${alunoid}`;
  //   return this.http.delete<number>(apiurl, httpOptions);  
  // }  
  
}
