import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
import { ToastrService } from 'ngx-toastr';

import { HabiticaService } from './habitica.service';
import { CookieService } from 'ngx-cookie-service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CookieService, HabiticaService, ToastrService]
})
export class AppComponent {
  public settingsOpened = false;
  @ViewChild('settings') settingsPanel: SettingsComponent;

  constructor(
    private habitica: HabiticaService,
    private notificationService: PushNotificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.notificationService.requestPermission();
  }

  public sendAlert(): void {
    this.notificationService.create('POMODORO').subscribe();
  }

  public stopTimer(isOvertime: boolean): void {
    this.habitica.pomodoroTask(
      this.settingsPanel.settings.get('user').value,
      this.settingsPanel.settings.get('apiKey').value,
      this.settingsPanel.settings.get('habitUid').value,
      !isOvertime
    ).subscribe(value => {
      if (value.success) {
        this.toastr.success('Successfully updated habit.');
      } else {
        this.toastr.error('An error has occured.');
      }
    });
  }
}
