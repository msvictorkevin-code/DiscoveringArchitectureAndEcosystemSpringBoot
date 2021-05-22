import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ClienteService} from './cliente.service';
import {Clientes} from './clientes';
import {tap} from 'rxjs/operators'
import {Region} from "./region";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  cliente: Clientes = new Clientes();
  regiones: Region[];
  titulo: string = 'Crear Cliente';
  errores: String[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {


    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
        console.log(this.cliente);
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} ha sido creado con exito!`, 'success')
      }, err => {
        this.errores = err.error.errors as String[];
        console.error('Codigo del error desde el backend:' + err.status);
        console.error(err.error.errors);
      }
    )

  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo actualizado', `Cliente actualizado ${json.mensaje}: ${json.cliente.nombre}`, 'success')
      },
      err => {
        this.errores = err.error.errors as String[];
        console.error('Codigo del error desde el backend:' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null ||o1 === undefined||o2 === undefined? false : o1.id === o2.id;
  }
}
