import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() requiredFileType:string | undefined;
  @Output() uploadedFile = new EventEmitter();

  fileName = '';
  uploadProgress!:number ;
  uploadSub!: Subscription ;
  uploaded: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
      const file:File = event.target.files[0];
    
      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("file", file);

          const upload$ = this.http.post(environment.imageBaseUrl + environment.imageBasePath, formData, {
              reportProgress: true,
              observe: 'events'
          })
          .pipe(
              finalize(() => this.reset())
          );
        
          this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
              this.uploaded=true;
            }
          })
          //if(this.uploaded){
           this.uploadedFile.emit({ uploadedFile: this.fileName });
          //}
      }
  }

  

cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = 0;
  this.uploadSub = new Subscription;
}

  ngOnInit(): void {
  }

}
