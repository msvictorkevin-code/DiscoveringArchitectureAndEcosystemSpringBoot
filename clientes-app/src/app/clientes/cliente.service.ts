import {Injectable} from '@angular/core';
import {formatDate, DatePipe, registerLocaleData} from '@angular/common';
import {Clientes} from './clientes'
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http'
import {catchError, map, switchAll, tap} from 'rxjs/operators'
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import localeES from '@angular/common/locales/es';
import {Region} from "./region";
import {AuthService} from "../usuarios/auth.service";

@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }


 /* private isNoAutorizado2(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }*/

  getClientes2(): Observable<Clientes[]> {
    /* return this.http.get(this.urlEndPoint).pipe(
       map((response)=> response as Clientes[]));*/
    //return of(CLIENTES);
    /*return this.http.get<Clientes[]>(this.urlEndPoint);*/
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let clientes = response as Clientes[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //registerLocaleData(localeES,'es');
          //let datePipe = new DatePipe('en-US');
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy') //formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
          return cliente;
        });
      })
    );
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.info('Cliente service tap 1');
        let clientes = response as Clientes[];
        (response.content as Clientes[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      }),
      map((response: any) => {
        (response.content as Clientes[]).map(
          cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            return cliente;
          });
        return response;
      }),
      tap(response => {
        console.info('Cliente service tap 2');
        (response.content as Clientes[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    );
  }

  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post(this.urlEndPoint, cliente, /*{headers: this.agregarAuthorizationHeader()}*/).pipe(
      map((response: any) => response.cliente as Clientes),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  update(cliente: Clientes): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/ ${cliente.id}`, cliente, /*{headers: this.agregarAuthorizationHeader()}*/).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`, /*{headers: this.agregarAuthorizationHeader()}*/).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`, /*{ headers: this.agregarAuthorizationHeader() }*/).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  /*subirFoto(archivo: File, id): Observable<Clientes> {
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    return this.http.post(`${this.urlEndPoint}/upload/`,formData).pipe(
      map((response:any) => response.cliente as Clientes ),
      catchError( e=> {
        console.error(e.error.mensaje);
        Swal.fire(
          'Error al editar!',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }*/

  subirFoto(archivo: File, id): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload/`, formData, {
      reportProgress: true,
      headers:httpHeaders
    });
    return this.http.request(req);
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones',/*{headers:this.agregarAuthorizationHeader()}*/);
  }
}
