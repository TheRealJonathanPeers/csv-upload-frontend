import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/**
 * @class UploadService handles everything that has to do with files
 *
 * @author Jonathan Peers
 */
export class UploadService {

  constructor(private http: HttpClient) {
  }

  /**
   * @method getAllFiles
   *
   * @returns 2D array of json objects as an Observable<any> type
   */
  getAllFiles(): Observable<any> {
    return this.http.get(`${environment.backendDev}/file`);
  }

  /**
   * @method uploadCSV
   * @param file is a file object that will be sent to the backend to be uploaded
   *
   * @returns array of json objects in the form of a Promise<any> type
   */
  uploadCSV(file): Observable<any> {
    return this.http.post(`${environment.backendDev}/file/upload`, file);
  }

  /**
   * @method isCSVFile checks if the file to be uploaded has a csv extension or not
   * @param file is a file object that will be checked
   */
  isCSVFile(file: any): boolean {
    return file.name.endsWith('.csv');
  }
}
