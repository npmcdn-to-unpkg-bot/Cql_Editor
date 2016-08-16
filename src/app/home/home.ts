import {Component} from '@angular/core';
import { AceEditorDirective } from 'ng2-ace-editor';


@Component({
  selector: 'home',
  pipes: [],
  providers: [],
  directives: [AceEditorDirective],
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {

  text: string = "";

  constructor() {
  };
}
