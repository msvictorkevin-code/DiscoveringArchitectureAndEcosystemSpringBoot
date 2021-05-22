import {Component, OnInit} from '@angular/core';
import {Clientes} from './clientes'
import {ClienteService} from './cliente.service'
import Swal from 'sweetalert2'
import {tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {ModalService} from "./detalle/modal.service";
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {


  clientes: Clientes[];
  paginador:any;
  clienteSeleccionado:Clientes;

  constructor(private activatedRoute:ActivatedRoute,
    private clienteService: ClienteService,
              private modalService:ModalService,
  public authService:AuthService) {
  }

  ngOnInit(): void {
    //this.clientes = this.clienteService.getClientes();
   /* this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );*/
    this.activatedRoute.paramMap.subscribe(
      params => {
        let page:number =+ params.get('page');
        if(!page){
          page = 0;
        }
        this.clienteService.getClientes(page).pipe(
          tap(response => {
            console.info('ClientesComponent');
            (response.content as Clientes[]).forEach(cliente => {
              console.log(cliente.nombre);
            });
          }
        )
        ).subscribe ( response => {
          this.clientes = response.content as Clientes[];
          this.paginador = response;
        });

        this.modalService.notificarUpload.subscribe(cliente => {
          this.clientes.map( clienteOriginal => {
            if(cliente.id == clienteOriginal.id){
              clienteOriginal.foto = cliente.foto;
            }
            return clienteOriginal;
          })
          })

      }
    );

  }

  delete(cliente: Clientes): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(cliente:Clientes){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
    console.info('abrir Modal');
  }

}
