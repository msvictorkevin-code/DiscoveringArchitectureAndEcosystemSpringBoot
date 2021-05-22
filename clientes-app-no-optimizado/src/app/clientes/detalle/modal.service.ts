import {Injectable,EventEmitter} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  modal: boolean = false;
  private _eventEmitter = new EventEmitter<any>();

  constructor() {
  }

  get notificarUpload(): EventEmitter<any>{
    return this._eventEmitter;
  }


  cerrarModal(): void {
    this.modal = false;
  }

  abrirModal(): void {
    this.modal = true;
  }
}
