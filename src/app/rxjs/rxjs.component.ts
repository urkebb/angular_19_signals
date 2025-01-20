import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  imports: [],
  standalone: true,
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsComponent implements OnDestroy {
  private readonly subscription: Subscription;
  readonly firstNumber = new BehaviorSubject(10);
  readonly secondNumber = new BehaviorSubject(10);
  readonly thirdNumber = new BehaviorSubject(10);

  constructor() {
    this.subscription = combineLatest(
      [this.firstNumber, this.secondNumber, this.thirdNumber]
    ).subscribe(([first, second, third]) => {
      console.log('First number is ', first);
      console.log('Second number is ', second);
      console.log('Third number is ', third);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeNumbers(): void {
    this.firstNumber.next(20);
    this.secondNumber.next(20);
    this.thirdNumber.next(20);
  }

}
