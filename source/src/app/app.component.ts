import { Component } from '@angular/core';
//import { AceEditorDirective } from 'ng2-ace-editor';
//import { MdButton } from '@angular2-material/button';
import { APIService, AceEditorDirective } from './shared/index';

import 'brace/theme/clouds';
import 'brace/mode/sql';
import 'cql-ace-syntax/cql'; 

@Component({
  directives: [AceEditorDirective],
  providers: [APIService],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

 constructor (private _apiService: APIService) {

 }

  error : string = '';
  running: boolean = false;

  // Input editor settings
  iText: string = `# Enter your CQL script here and press 'Run'
# The results will be displayed on the console to the right

`;
  iOptions:any = {vScrollBarAlwaysVisible: true} ;
  iTheme: string = "clouds";

  runScript() {
    if (!this.running) {
      this.running = true;
      this._apiService
        .post(this.iText)
        .then(response => {
          this.oText += '\n' + response + '\n';
          this.running = false;

        })
        .catch(error => this.error = error);
    }
  }

  onInputChange(code) {
    this.iText = code;
  }

  // Output editor settings
  
  oText: string = `# This is where your CQL script results will be displayed

`;
  oOptions:any = { vScrollBarAlwaysVisible: true, showLineNumbers: false , showGutter: false };
  oIsReadOnly: boolean = true;

  clearOutput() {
    this.oText = '';
  }

  resources: boolean = false;

  toggleResources () {
    this.resources = !this.resources;
  }

  // TODO: Strip comments from user's script


}
