import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/storage';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  storage = firebase.storage();
  searchResult = new Array<any>();
  constructor(private router: Router) { }

  ngOnInit() {
    this.searchResult = JSON.parse(localStorage.getItem('searchResult'));
  }

  // showimage() {
  //   const storageRef = firebase.storage().ref();
  //   const spaceRef = storageRef.child('produtos/camisa-branca.png');
  //   spaceRef.getDownloadURL().then(function(url) {
  //       const test = url;
  //       alert(url);
  //       document.querySelector('img').src = test;

  //   }).catch(function(error) {

  //   });
  // }

  redirectTo() {
    this.router.navigate(['/product-detail']);
  }
}
