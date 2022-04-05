import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {AlertComponent} from "./alert/alert.component";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule
  ]
})
export class SharedModule {

}
