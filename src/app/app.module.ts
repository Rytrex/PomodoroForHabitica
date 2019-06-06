// #region imports
// #region angular imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// material imports
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
// #endregion

// #region other imports
import { PushNotificationService } from 'ngx-push-notifications';
import { ToastrModule } from 'ngx-toastr';
// #endregion

// #region local imports
import { AppComponent } from './app.component';
import { TimerModule } from './components/timer/timer.module';
import { SettingsComponent } from './settings/settings.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// #endregion
// #endregion

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    ReactiveFormsModule,
    TimerModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    SettingsComponent
  ],
  bootstrap: [
    AppComponent,
    SettingsComponent
  ],
  providers: [PushNotificationService]
})
export class AppModule { }
