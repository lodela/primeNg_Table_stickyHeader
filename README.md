# PTable
### by: Norberto Lodela

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.

# Demo

A demo can be seen [here](https://lodela.github.io/primeNg_Table_stickyHeader/){:target="_blank"}.

# API

The directive accepts 2 attributes:

**stickyTop (number):** Number of pixels from the window top after which the header becomes sticky. Default is 0.

**columnWidth (object):** An optional Column Width. You can set up the width of a specific column, starting from cero, let's say the first column is cero and so on...  ie. {'0':50, 1:150, 3:350, all:250}. You must _at least_ indicate the _**all**_ width for **all columns** in order to make the directive work correctly... **note:** if you don't declare the *all* width, the scroll bar will never show up...

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
