import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PushNotificationService } from 'ngx-push-notifications';
import { ToastrService } from 'ngx-toastr';

import { HabiticaService } from './habitica.service';
import { CookieService } from 'ngx-cookie-service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'pomodoro-habitica',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CookieService, HabiticaService, ToastrService],
  encapsulation: ViewEncapsulation.None
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

  public timeIsUp(submitToHabitica: boolean): void {
    if (submitToHabitica) {
      this.habitica.pomodoroTask(
        this.settingsPanel.settings.get('user').value,
        this.settingsPanel.settings.get('apiKey').value,
        this.settingsPanel.settings.get('habitUid').value
      ).subscribe(value => {
        if (value.success) {
          this.toastr.success('Successfully updated habit.');
        } else {
          this.toastr.error('An error has occured.');
        }
      });
    }
  }
}
