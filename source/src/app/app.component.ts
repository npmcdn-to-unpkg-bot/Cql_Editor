import { Component } from '@angular/core';
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

 constructor (private _apiService: APIService) {}

  error : string = '';
  running: boolean = false;

  // Input editor settings
  iText: string = `// Enter your CQL script here and press 'Run'
// The results will be displayed on the console to the right

`;
  iOptions:any = {vScrollBarAlwaysVisible: true} ;
  iTheme: string = "clouds";

  runScript() {
    if (!this.running) {
      this.running = true;
      this._apiService
        .post(this.iText)
        .then(responses => {
          this.processResponses(responses);
          this.running = false;
        })
        .catch(error => this.error = error);
    }
  }

  // Walks through responses and tacks each one onto the output window
  private processResponses (responses: any) {
    for (let response of responses) {
      // Invalid expression – could not translate
      if (response['translation-error']) {
        this.oText += '>> Translation Error: ' + response['translation-error'] + '\n';
      }
      // Invalid expression – error with named expression
      if (response['error']) {
        this.oText += '>> Error: ' + response['error'] + '\n';
      }
      // Valid expression
      if (response['result']) {
        this.oText += '>> ' + response.result + '\n';
      }
      
    }
  }

  onInputChange(code) {
    this.iText = code;
  }

  // Output editor settings
  
  oText: string = `// CQL expression results

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

}
