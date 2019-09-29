import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  uploadCSV(file) {
    return this.http.post(`${environment.backendDev}/file/upload`, file);
  }

  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${environment.backendDev}/file`);
  }
}
