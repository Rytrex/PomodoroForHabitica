import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { HabiticaService } from './../habitica.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [CookieService, HabiticaService, ToastrService]
})
export class SettingsComponent {
  public settings: FormGroup;
  public userTasks: any[];

  private fields = ['user', 'apiKey', 'habitUid', 'rememberMe'];
  
  constructor(
    private cookies: CookieService,
    private formBuilder: FormBuilder,
    private habitica: HabiticaService
  ) { }

  ngOnInit() {
    this.createForm();
    this.setUserValues();
  }

  private createForm(): void {
    this.settings = this.formBuilder.group({
      user: ['', Validators.required],
      apiKey: ['', Validators.required],
      habitUid: [null, Validators.required],
      rememberMe: [false]
    });

    this.settings.get('user').valueChanges.subscribe(value => {
      this.getUserTasks(value, this.settings.get('apiKey').value);
      this.cookies.set('user', value, this.nextMonthDate);
    });

    this.settings.get('apiKey').valueChanges.subscribe(value => {
      this.getUserTasks(this.settings.get('user').value, value);
      this.updateApiKeyCookie();
    });

    this.settings.get('habitUid').valueChanges.subscribe(value => {
      this.cookies.set('habitUid', value, this.nextMonthDate);
    });

    this.settings.get('rememberMe').valueChanges.subscribe(value => {
      this.cookies.set('rememberMe', value, this.nextMonthDate);
      this.updateApiKeyCookie();
    })
  }

  private getUserTasks(user: string, key: string): void {
    if (user && key) {
      this.habitica.getUserTasks(user, key).subscribe(value => this.userTasks = (<any>value).data);
    }
  }

  private setUserValues(): void {
    this.fields.forEach(field => {
      if (this.cookies.check(field)) {
        this.settings.get(field).patchValue(this.cookies.get(field));
      }
    })
  }

  private updateApiKeyCookie(): void {
    if (this.settings.get('rememberMe').value) {
      console.log('stored')
      this.cookies.set('apiKey', this.settings.get('apiKey').value, this.nextMonthDate);
    } else {
      console.log('deleted')
      this.cookies.delete('apiKey');
    }
  }

  private get nextMonthDate(): Date {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, today.getDay());
  }
}
