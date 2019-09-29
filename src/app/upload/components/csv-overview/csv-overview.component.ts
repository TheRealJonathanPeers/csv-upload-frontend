import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from '../../../util/services/toast.service';

@Component({
  selector: 'app-csv-overview',
  templateUrl: './csv-overview.component.html',
  styleUrls: ['./csv-overview.component.scss']
})

/**
 * @class CsvOverviewComponent handles the logic for this component
 *
 * @author Jonathan Peers
 */
export class CsvOverviewComponent implements OnInit {
  csvForm: FormGroup;
  uploadStatus = 'assistant twikky standing by';
  $csvs: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private currentCSV: { data: any[]; keys: any };
  private validFile: boolean;

  constructor(
    private us: UploadService,
    private ts: ToastService,
    private fb: FormBuilder,
  ) {
  }

  get csvs() {
    return this.$csvs.getValue();
  }

  get form() {
    return this.csvForm.controls;
  }

  ngOnInit() {
    this.csvForm = this.fb.group({
      file: ['', [Validators.required]]
    });

    this.us.getAllFiles().subscribe((json: any[]) => {
      this.$csvs.next(json);
      if (this.csvs.length < 1) {
        this.uploadStatus = 'Uh oh! We\'re running low on csv files, start feeding me data!';
      }
    });

    this.csvForm.valueChanges.subscribe(value => {
      this.uploadStatus = JSON.stringify(value);
    });
  }

  /**
   * @method changeListener listens for selected files
   * @param $event indicates a file has been selected
   *
   * @returns void
   */
  fileSelectListener($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file);

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const isCSV = this.us.isCSVFile(file);

    if (isCSV) {
      this.validFile = true;
      this.uploadStatus = `file \'${file.name}\' selected, now click on \'Upload file\'`;
      this.csvForm.patchValue({file: formData});
    } else {
      this.uploadStatus = 'select a .csv file';
      this.validFile = false;
    }
  }

  /**
   * @method onFileUpload uploads the file to the backend if the form is valid
   *
   * @returns void
   */
  onFileUpload() {
    if (this.csvForm.valid && this.validFile) {
      console.log('csvform is valid!');
      const file = this.form.file.value;
      console.log(file);

      this.us.uploadCSV(file).subscribe((jsonCsv: any) => {
        const csv = Object.values(jsonCsv);
        console.log(Object.keys(csv));
        console.log(jsonCsv);
        this.csvs.push(csv);
        this.uploadStatus = 'Good job, keep feeding me data!';
        this.ts.showToast(`file was succesfully uploaded!`, 'OK');
      });

    } else {
      this.uploadStatus = 'please upload a valid file';
    }
  }

  transformToDataSource(csv: any) {
    this.currentCSV = {data: Object.values(csv), keys: this.columns(csv)};
    return this.currentCSV;
  }

  columns(csv: any) {
    return csv.map(obj => Object.keys(obj))[0];
  }
}
