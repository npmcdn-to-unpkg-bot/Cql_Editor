import {Component} from '@angular/core';
import { AceEditorDirective } from 'ng2-ace-editor';

import 'cql-ace-syntax/cql'; 

@Component({
  selector: 'home',
  pipes: [],
  providers: [],
  directives: [AceEditorDirective],
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {

  eText: string = "";
  eOptions: any = [
    {hScrollBarAlwaysVisible: true}
  ];

  constructor() {
  };
}
