import { Component } from '@angular/core';
import { AceEditorDirective } from 'ng2-ace-editor';
//import { MdButton } from '@angular2-material/button';

import 'brace/theme/clouds';
import 'brace/mode/sql';
import 'cql-ace-syntax/cql'; 


@Component({
  moduleId: module.id,
  directives: [AceEditorDirective],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  iText: string = "";
  iOptions:any = 
    {vScrollBarAlwaysVisible: true}
  ;


}
