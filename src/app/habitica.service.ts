import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class HabiticaService {
  private apiUrl = 'https://habitica.com/api/v3'

  constructor(
    private http: HttpClient
  ) { }

  public pomodoroTask(user: string, key: string, taskID: string, withinFiveMinutes: boolean): Observable<any> {
    let url = `${this.apiUrl}/tasks/${taskID}/score/${withinFiveMinutes ? 'up' : 'down'}`
    return this.http.post(url, {}, this.makeHeader(user, key))
  }

  public getUserTasks(user: string, key: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/user?type=habits`, this.makeHeader(user, key));
  }

  private makeHeader(user: string, key: string): any {
    return { headers: { 'x-api-key': key, 'x-api-user': user } }
  }
}