"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map:any = {
    'brace' : 'vendor/brace',
    'w3c-blob' : 'vendor/w3c-blob',
    'buffer': 'vendor/buffer-shims',
    'ng2-ace-editor': 'vendor/ng2-ace-editor',
    'cql-ace-syntax': 'vendor/cql-ace-syntax',
    '@angular2-material': 'vendor/@angular2-material'
};

/** User packages configuration. */
const packages:any = {
    'w3c-blob': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    'brace': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    'buffer': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    'ng2-ace-editor': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    'cql-ace-syntax': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'cql.js'
    },
    '@angular2-material/core': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'core.js'
    },
    '@angular2-material/button': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'button.js'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
