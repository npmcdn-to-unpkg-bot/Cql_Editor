import {Component} from '@angular/core';

@Component({
  selector: 'references',
  pipes: [],
  providers: [],
  directives: [],
  styleUrls: ['./references.css'],
  templateUrl: './references.html'
})
export class References {
  constructor() {
    document.getElementById('editor').style.display="none";
  };
}
