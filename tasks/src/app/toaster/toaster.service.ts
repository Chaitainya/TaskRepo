import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toaster = new BehaviorSubject({});
  private _toaster$ = this.toaster.asObservable();

  constructor() { }

  toggleToaster(data: any){
    return this.toaster.next(data);
  }

  getToasterStatus(): Observable<any>{
    return this._toaster$;
   }
}
