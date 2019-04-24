import {
  Component,
  Compiler, ViewContainerRef,
  ViewChild, Injector, NgModuleRef, NgModule, OnInit, Injectable
} from '@angular/core';

import { SampleService } from './sample.service';
import { LazyModule } from './lazy.module';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 5';

  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  constructor(
    private compiler: Compiler, private sampleService: SampleService) {
   
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.compiler.compileModuleAndAllComponentsAsync(LazyModule)
      .then((factories) => {
        const f = factories.componentFactories[0];

        const cmpRef = this.vc.createComponent(f);

        cmpRef.instance.name = 'dynamic';
      });
  }

}

  // ngAfterViewInit() {

  //   const template = '<span>generated on the fly: {{name}}</span>';

  //   const tmpCmp = Component({ template: template })(class implements OnInit {
  //     public name: string;
  //     constructor(public sampleService: SampleService) { }
  //     ngOnInit() {
  //       setTimeout(() => this.name = this.sampleService.foo(), 1000)
  //     }
  //   });
  //   const tmpModule = NgModule({
  //     declarations: [tmpCmp], providers: [{
  //       provide: SampleService, useClass: SampleService
  //     }]
  //   })(class {
  //   });

  //   this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
  //     .then((factories) => {
  //       const f = factories.componentFactories[0];

  //       const cmpRef = this.vc.createComponent(f);

  //       cmpRef.instance.name = 'dynamic';
  //     });
  // }

