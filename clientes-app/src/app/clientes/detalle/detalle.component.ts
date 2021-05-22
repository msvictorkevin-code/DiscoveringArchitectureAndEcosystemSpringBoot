import {Component, Input, OnInit} from '@angular/core';
import {Clientes} from "../clientes";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute} from "@angular/router";
import Swal from 'sweetalert2';
import {HttpEventType} from "@angular/common/http";
import {ModalService} from "./modal.service";
import {AuthService} from "../../usuarios/auth.service";

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Clientes;
  titulo: string = 'Detalle del Cliente';
  fotoSeleccionada: File;
   progreso: number=0;
   modal:boolean = false;

  constructor(private  clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe(param => {
      let id: number = +param.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    });*/
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe de ser tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }


  subirFoto() {
    if(!this.fotoSeleccionada){
      Swal.fire(
        'Error Upload: ',
        'Debe seleccionar una foto',
        'error'
      );
    }else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          }else if(event.type == HttpEventType.Response){
            let response:any = event.body;
            this.cliente = response.cliente as Clientes;
            this.modalService.notificarUpload.emit(this.cliente);
            Swal.fire(
              'La foto se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
         /* this.cliente = cliente;
          Swal.fire(
            'La foto se ha subido completamente!',
            `La foto se ha subido con exito:${this.cliente.foto}`,
            'success'
          );*/
        }
      );
    }
  }

  cerrarModal():void{
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
