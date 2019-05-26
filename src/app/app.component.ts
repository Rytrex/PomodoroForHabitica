import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
import { ToastrService } from 'ngx-toastr';

import { HabiticaService } from './habitica.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CookieService, HabiticaService, ToastrService]
})
export class AppComponent {
  private form: FormGroup;
  private userTasks: any[];

  constructor(
    private cookies: CookieService,
    private formBuilder: FormBuilder,
    private habitica: HabiticaService,
    private notificationService: PushNotificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.notificationService.requestPermission()
    this.createForm();
    this.setUserValues();
  }

  public sendAlert(): void {
    this.notificationService.create('POMODORO').subscribe();
  }

  public stopTimer(isOvertime: boolean): void {
    this.habitica.pomodoroTask(
      this.form.get('user').value,
      this.form.get('apiKey').value,
      this.form.get('habitUid').value,
      !isOvertime
    ).subscribe(value => {
      if (value.success) {
        this.toastr.success('Successfully updated habit.');
      } else {
        this.toastr.error('An error has occured.');
      }
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      apiKey: ['', Validators.required],
      habitUid: [null, Validators.required]
    });

    this.form.get('user').valueChanges.subscribe(value => {
      this.getUserTasks(value, this.form.get('apiKey').value);
      this.cookies.set('user', value);
    });

    this.form.get('apiKey').valueChanges.subscribe(value => {
      this.getUserTasks(this.form.get('user').value, value);
      this.cookies.set('apiKey', value);
    });

    this.form.get('habitUid').valueChanges.subscribe(value => {
      this.cookies.set('habitUid', value);
    });
  }

  private getUserTasks(user: string, key: string): void {
    if (user && key) {
      this.habitica.getUserTasks(user, key).subscribe(value => this.userTasks = (<any>value).data);
    }
  }

  private setUserValues(): void {
    if (this.cookies.check('user')) {
      this.form.get('user').patchValue(this.cookies.get('user'));
    }
    if (this.cookies.check('apiKey')) {
      this.form.get('apiKey').patchValue(this.cookies.get('apiKey'));
    }
    if (this.cookies.check('habitUid')) {
      this.form.get('habitUid').patchValue(this.cookies.get('habitUid'));
    }
  }
}
