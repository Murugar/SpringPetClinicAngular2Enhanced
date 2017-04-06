

import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {Vet} from './vet';

@Injectable()
export class VetService {

  entity_url = environment.REST_API_URL + 'vets';

  constructor(private _http: Http) {
  }

  getVets(): Observable<Vet[]> {
    return this._http.get(this.entity_url)
      .map((response: Response) => <Vet[]> response.json())
      .catch(this.handleError);
  }
  
  getVetById(vet_id: string): Observable<Vet> {
      return this._http.get((this.entity_url + '/' + vet_id))
        .map((response: Response) => <Vet> response.json())
        .catch(this.handleError);
    }
  
  addVet(vet: Vet): Observable<Vet> {
      const headers = new Headers();
      const body = JSON.stringify(vet);
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return this._http.post(this.entity_url, body, {headers})
        .map((response: Response) => <Vet> response.json())
        .catch(this.handleError);
    }
  
  
  updateVet(vet_id: string, vet: Vet): Observable<Vet> {
      const body = JSON.stringify(vet);
      const headers = new Headers({'Content-Type': ' application/json;charset=UTF-8'});
      const options = new RequestOptions({headers: headers});
      return this._http.put((this.entity_url + '/' + vet_id), body, options)
        .map((response: Response) => response)
        .catch(this.handleError); // TODO parse response header when error ?
    }
  
  deleteVet(vet_id: string): Observable<number> {
      const headers = new Headers({'Content-Type': ' application/json;charset=UTF-8'});
      const options = new RequestOptions({headers: headers});
      return this._http.delete(this.entity_url + '/' + vet_id, options)
        .map((response: Response) => response.status)
        .catch(this.handleError);
    }

  
  
  private handleError(error: Response | any) {
    console.log('handleError log: ');
    let errMsg: string;
    if (error instanceof Response) {
      if (!(error.text() === '' )) {  // if response body not empty
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        console.log('binding errors header not empty');
        errMsg = error.headers.get('errors').toString();
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
