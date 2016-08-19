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

  loading: boolean = false;

  // Input editor settings
  iText: string = `// Enter your CQL script here and press 'Run'"
// The results will be displayed on the console to the right

`;
  iOptions:any = {vScrollBarAlwaysVisible: true} ;
  
  runScript() {
    // TODO: Add call to API service
    this.loading = true;
    this.oText += this.iText;
    //this.loading = false;
  }
  

  // Output editor settings
  oTheme: string = "clouds";
  oText: string = `// This is where your CQL script results will be displayed

`;
  oOptions:any = { vScrollBarAlwaysVisible: true, showLineNumbers: false , showGutter: false };
  oIsReadOnly: boolean = true;

  clearConsole() {
    this.oText = '';
  }

  resources: boolean = false;

  toggleResources () {
    this.resources = !this.resources;
  }

  // TODO: Strip comments from user's script


}
