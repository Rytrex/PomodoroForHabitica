import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable()
export class HabiticaService {
  private apiUrl = 'https://habitica.com/api/v3'
  private userInfo: {key: string, user: string}

  constructor(
    private http: HttpClient
  ) { }

  public pomodoroTask(taskID: string, withinFiveMinutes: boolean): void {
    this.http.post(`${this.apiUrl}/${taskID}/score/${withinFiveMinutes ? 'up': 'down'}`, null)
  }

  public setUserInfo(userInfo: {key: string, user: string}): void {
    this.userInfo = userInfo;
  }

  public getUserTasks() {
    console.log(this.getHeaders())
    return this.http.get(`${this.apiUrl}/tasks/user?type=habits`, this.getHeaders());
  }

  private getHeaders(): any {
    return {
      headers: {
      'x-api-key': this.userInfo.key,
      'x-api-user': this.userInfo.user
      }
    }
  }
}