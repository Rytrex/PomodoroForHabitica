import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  /**
   * Timer counts down from this number of minutes
   */
  @Input() public endsIn;
  /**
   * Prevents the timer from starting
   */
  @Input() public disabled = false;

  /**
   * Emits an event when the timer hits 0
   */
  @Output() atZero: EventEmitter<string> = new EventEmitter()

  public timeLeft: { mins: number, secs: number };
  /** 
   * 0 = Not Started
   * 1 = Paused
   * 2 = Running
   * 3 = Ended
   */
  public status = 0;
  private obsTimer: Subscription;

  constructor() { }

  ngOnInit() {
    this.resetTimer();
  }

  ngDestory() {
    if (this.obsTimer) {
      this.obsTimer.unsubscribe();
    }
  }

  public startTimer(): void {
    if (!this.disabled) {
      this.runClock();
    }
  }

  public stopTimer(status: number): void {
    this.status = status;
    if (this.obsTimer) {
      this.obsTimer.unsubscribe();
    }
  }

  public resetTimer(): void {
    this.timeLeft = { mins: this.endsIn, secs: 0 };
    this.stopTimer(0);
  }

  public calculateTimeString(): string {
    if (this.timeLeft) {
      return this.timeLeft.mins + ':' + (this.timeLeft.secs < 10 ? 0 : '') + this.timeLeft.secs;
    } else {
      return '';
    }
  }

  private runClock(): void {
    this.status = 2;
    this.obsTimer = timer(0, 1000).subscribe(() => {
      this.timeLeft.secs--;
      if (this.timeLeft.secs < 0) {
        this.timeLeft.mins--;
        this.timeLeft.secs = 59;
      }

      if (this.timeLeft.mins === 0 && this.timeLeft.secs === 0) {
        this.atZero.next();
        this.stopTimer(3);
      }
    });
  }
}
