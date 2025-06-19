import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toaster = new BehaviorSubject(false);
  private _toaster$ = this.toaster.asObservable();

  constructor() { }

  toggleToaster(status: boolean){
    return this.toaster.next(status);
  }

  getToasterStatus(): Observable<any>{
    return this._toaster$;
   }
}
