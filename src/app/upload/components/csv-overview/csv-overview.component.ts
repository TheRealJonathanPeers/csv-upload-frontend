import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-csv-overview',
  templateUrl: './csv-overview.component.html',
  styleUrls: ['./csv-overview.component.scss']
})
export class CsvOverviewComponent implements OnInit {
  csvForm: FormGroup;
  uploadStatus = 'upload a file';
  $csvs: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private us: UploadService,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef
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
    });

  }

  changeListener($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file);

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    if (this.us.isCSVFile(file)) {
      this.csvForm.patchValue({
        file: formData
      });
      this.uploadStatus = 'file is ready to upload';

    } else {
      this.uploadStatus = 'select a .csv file';
    }

  }

  onBotCreate() {
    if (this.csvForm.valid) {
      console.log('csvform is valid!');
      const file = this.form.file.value;
      console.log(file);

      this.us.uploadCSV(file).subscribe((jsonCsv: any) => {
        const csv = Object.values(jsonCsv);
        console.log(Object.keys(csv));
        console.log(jsonCsv);
        // this.uploadStatus = JSON.stringify(csv.map(obj => Object.keys(obj))[0]);
        this.csvs.push(csv);
      });

      // for each csv file a new table
    } else {
      this.uploadStatus = 'please upload a valid file';
    }
  }

  transformToDataSource(csv: any) {
    return Object.values(csv);
  }

  columns(csv: any) {
    return csv.map(obj => Object.keys(obj))[0];
  }
}
