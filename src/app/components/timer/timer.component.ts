import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent {
  /**
   * Show start and end buttons
   */
  @Input() public showButtons = true;
  /**
   * Timer counts down from this number
   */
  @Input() public endsIn = 25

  @Output() end: EventEmitter<string> = new EventEmitter()
  @Output() stopTimer: EventEmitter<string> = new EventEmitter()

  public endTime: number;
  public time: { mins: number, secs: number };
  public isIncrementing = false;
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
    this.endTime = Date.now() + this.endsIn * 60025;
    this.obsTimer = timer(0, 1000).subscribe(() => {
      this.updateTimer()
    });
  }

  public endTimer(): void {
    this.resetTimer();
    this.stopTimer.next();
  }

  public updateTimer(): void {
    let difference = this.endTime - Date.now();
    this.time.mins = Math.abs(Math.floor(difference / (1000 * 60)));
    this.time.secs = Math.abs(Math.floor(((difference % (1000 * 60)) / 1000)));

    // alert user when timer changes to incrementing
    if (this.isIncrementing !== difference < 0) {
      this.end.next();
    }

    this.isIncrementing = difference < 0;
    if (this.isIncrementing) {
      // subtract one otherwise it starts counting up at 1:01
      this.time.mins--;
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

    if (this.obsTimer) {
      this.obsTimer.unsubscribe();
    }
  }
}
