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
      habitUid: [null, Validators.required]
    });

    this.settings.get('user').valueChanges.subscribe(value => {
      this.getUserTasks(value, this.settings.get('apiKey').value);
      this.cookies.set('user', value);
    });

    this.settings.get('apiKey').valueChanges.subscribe(value => {
      this.getUserTasks(this.settings.get('user').value, value);
      this.cookies.set('apiKey', value);
    });

    this.settings.get('habitUid').valueChanges.subscribe(value => {
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
      this.settings.get('user').patchValue(this.cookies.get('user'));
    }
    if (this.cookies.check('apiKey')) {
      this.settings.get('apiKey').patchValue(this.cookies.get('apiKey'));
    }
    if (this.cookies.check('habitUid')) {
      this.settings.get('habitUid').patchValue(this.cookies.get('habitUid'));
    }
  }
}
