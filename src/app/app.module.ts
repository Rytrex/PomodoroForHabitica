import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushNotificationService } from 'ngx-push-notifications';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TimerModule } from './components/timer/timer.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TimerModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [PushNotificationService]
})
export class AppModule { }
