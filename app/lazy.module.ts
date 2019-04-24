import {NgModule} from "@angular/core";
import {Component} from '@angular/core';
import { SampleService } from './sample.service';

@Component({
  selector: 'lazy-component',
  template: 'Lazy-loaded component. name:  {{name}}.Service {{service.foo()}}!',
  //providers: [SampleService]
})
export class LazyComponent {
  name;
  constructor(public service: SampleService) {
    console.log(service);
    console.log(service.foo());
  }
}

@NgModule({
  declarations: [LazyComponent],
  providers: [SampleService]
})
export class LazyModule {
}
