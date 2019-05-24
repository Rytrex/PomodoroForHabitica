import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { HabiticaService } from './habitica.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CookieService, HabiticaService ]
})
export class AppComponent {
  private userInfo = {key: null, user: null};
  private userTasks = []

  constructor(
    private habitica: HabiticaService,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    this.setUserInfo();
  }

  public sendAlert(): void {
    alert('POMODORO');
  }

  public getUserTasks(): void {
    this.habitica.getUserTasks().subscribe(value => this.userTasks = (<any>value).data);
  }

  private setUserInfo(): void {
    if (this.cookies.check('user')) {
      this.userInfo.user = this.cookies.get('user');
    } else {
      this.userInfo.user = prompt('Enter your User UID')
      this.cookies.set('user', this.userInfo.user)
    }

    if (this.cookies.check('key')) {
      this.userInfo.key = this.cookies.get('key');
    } else {
      this.userInfo.key = prompt('Enter your API Token')
      this.cookies.set('key', this.userInfo.key)
    }

    this.habitica.setUserInfo(this.userInfo);
  }
}
