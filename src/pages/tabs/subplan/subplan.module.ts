import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubplanPage } from './subplan';
 
@NgModule({
  declarations: [
    SubplanPage,
  ],
  imports: [
    IonicPageModule.forChild(SubplanPage),
  ],
  exports: [
    SubplanPage
  ]
})
export class SubplanPageModule {}