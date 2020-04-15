import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/Service/image.service';
import { ReadVarExpr } from '@angular/compiler';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-dialog-component',
  templateUrl: './image-dialog-component.component.html',
  styleUrls: ['./image-dialog-component.component.css']
})
export class ImageDialogComponentComponent implements OnInit {
  public imageChangedEvent: any ='';
  public croppedImage:File;
  // imgURL:any;
  form: FormGroup;
file: File;
private base64textString:string="";
// Instantiate an AbstractControl from a user specified configuration
createForm() {
  this.form = this.fb.group({
    file_upload: null
  });
}
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponentComponent>,
    private imageService:ImageService,
    private fb: FormBuilder, private http: HttpClient,
    private snackbar:MatSnackBar

  ) { }

  ngOnInit(): void {
    this.createForm();
  }
// onFileSelect(event): void {
//     console.log(event)
//     this.imageChangedEvent = event;
//   // let reader=new FileReader;
//   // reader.readAsDataURL(event.taget.files[0])
//   // reader.onload=(event2)=>{this.imgURL=reader.result}

//   }
  // Check for changes in files inputs via a DOMString reprsenting the name of an event
  fileChange(event: any) {
    console.log("event checking")
    console.log("before base-->"+event)
    // event=event.base64;
    console.log("after base-->"+event)
    // Instantiate an object to read the file content
    // let reader = new FileReader();
    // when the load event is fired and the file not empty
    // if(event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      // this.file=event.base64;
      // this.file = event.target.files[0];
      var files=event.target.files;
      this.file=files[0];
    
        var reader = new FileReader();
        reader.onload=this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
        console.log("file-->");
        console.log(this.file);
     
    }
      _handleReaderLoaded(readerEvt)
      {
        console.log("##########")
        console.log(readerEvt);
        var binaryString=readerEvt;
        this.base64textString=btoa(binaryString);
        console.log(btoa(binaryString));
        
      }
     
    // }
  
url:any;
s3:string;
  // Upload the file to the API
  upload() {
    
    // Instantiate a FormData to store form fields and encode the file
    console.log("Entered into upload-->"+this.file)
    let body = new FormData();
    // Add file content to prepare the request
    body.append('file', this.file);
    // Launch post request
    this.http.post('http://localhost:8080/user/uploadProfile', body,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')) })
    .subscribe(
      
      // Admire results
      (response):any => {
        if(response!=null)
        {
          console.log("response checked url")
        console.log(response)
        this.url=response
        console.log(this.url)
        this.s3=this.url;
        console.log("Before local"+this.s3);
        localStorage.setItem("uurl",this.s3);
        localStorage.getItem("uurl")
        console.log("After local"+localStorage.getItem("uurl"));
        this.snackbar.open(
          "image uploaded successfully", "undo",
          { duration: 2000 }
        )
        }
      }
      
      // Or errors :-(
      // error => console.log(error),
      // // tell us if it's finished
      // () => { console.log("completed") }
     
    );
  }

}
