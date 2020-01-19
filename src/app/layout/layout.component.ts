import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { config } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  storage = firebase.storage();

  constructor() { }

  ngOnInit() {
  }
  
  showimage() {
    const storageRef = firebase.storage().ref();
    const spaceRef = storageRef.child('produtos/camisa-branca.png');
    spaceRef.getDownloadURL().then(function(url) {
        const test = url;
        alert(url);
        document.querySelector('img').src = test;

    }).catch(function(error) {

    });
  }
}
