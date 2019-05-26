import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  /**
   * Show start and end buttons
   */
  @Input() public showButtons = true;
  /**
   * Timer counts down from this number of minutes
   */
  @Input() public endsIn = 25;
  /**
   * Allowed time over endsIn amount
   */
  @Input() public allowedOvertime = 5;
  /**
   * Prevents the timer from starting
   */
  @Input() public disabled = false;

  /**
   * Emits an event when the timer hits 0
   */
  @Output() atZero: EventEmitter<string> = new EventEmitter()
  /**
   * Emits an event when the timer is stopped
   */
  @Output() stopTimer: EventEmitter<boolean> = new EventEmitter()

  public endTime: number;
  public time: { mins: number, secs: number };
  public isIncrementing = false;
  public isOvertime = false;
  private obsTimer: Subscription;
  private minutes = 60000;
  private seconds = 1000;

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
    this.endTime = Date.now() + this.endsIn * (this.minutes + 25);
    this.obsTimer = timer(0, 1000).subscribe(() => {
      this.updateTimer()
    });
    }
  }

  public endTimer(): void {
    this.stopTimer.next(this.isOvertime);
    this.resetTimer();
  }

  public updateTimer(): void {
    let difference = this.endTime - Date.now();
    this.time.mins = Math.abs(Math.floor(difference / this.minutes));
    this.time.secs = Math.abs(Math.floor(((difference % this.minutes) / this.seconds)));

    // alert user when timer changes to incrementing
    if (this.isIncrementing !== difference < 0) {
      this.atZero.next();
    }

    this.isIncrementing = difference < 0;
    if (this.isIncrementing) {
      // subtract one otherwise it starts counting up at 1:01
      this.time.mins--;
    }

    if (difference < 0 && Math.abs(difference) > this.allowedOvertime * this.minutes) {
      this.isOvertime = true;
    }
  }

  public calculateTimeString(): string {
    if (this.endTime) {
      return this.time.mins + ':' + (this.time.secs < 10 ? 0 : '') + this.time.secs;
    }
  }

  private resetTimer(): void {
    this.endTime = null
    this.time = { mins: null, secs: null }
    this.isIncrementing = false;
    this.isOvertime = false;

    if (this.obsTimer) {
      this.obsTimer.unsubscribe();
    }
  }
}
