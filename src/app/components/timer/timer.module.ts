import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { TimerComponent } from './timer.component'

@NgModule({
  imports: [BrowserModule, CommonModule, MatButtonModule],
  exports: [TimerComponent],
  declarations: [TimerComponent],
  bootstrap: [TimerComponent]
})
export class TimerModule { }
export * from './timer.component'