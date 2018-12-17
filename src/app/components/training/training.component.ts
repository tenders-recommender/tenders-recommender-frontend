import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  private fileReader: FileReader;
  private contentToUpload: string;
  private uploading = false;
  private training = false;

  constructor(private readonly apiService: ApiService) {
  }

  ngOnInit() {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.contentToUpload = fileReader.result as string;
    };

    this.fileReader = fileReader;
  }

  public addFile(event) {
    const fileToUpload: File = event.target.files[0];
    this.fileReader.readAsText(fileToUpload);
  }

  public uploadFile() {
    if (this.contentToUpload != null) {
      this.uploading = true;
      this.apiService.populateInteractions(this.contentToUpload)
        .then(() => this.uploading = false);
    }
  }

  public trainAlgorithm() {
    this.training = true;
    this.apiService.trainAlgorithm()
      .then(() => this.training = false);
  }
}
