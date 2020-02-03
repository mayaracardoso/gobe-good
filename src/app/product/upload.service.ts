import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

import { UploadFile } from './upload-file';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase) { }

  private basePath: string = '/produtos';
  public uploadFile: UploadFile;

  pushUpload(upload: UploadFile) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    console.log("uploadTask", uploadTask);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.name = upload.file.name;
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          upload.url = downloadURL;
        });
        this.uploadFile = upload;
      }
    );
  }
}