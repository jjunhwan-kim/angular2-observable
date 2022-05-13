import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      let intervalId = setInterval(() => {
        //console.log('Interval: ' + count);
        observer.next(count);
        if (count == 5) {
          observer.complete();
          //clearInterval(intervalId);
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter((data: number) => {
        return data > 0;
      }),
      map((data: number) => {
      return 'Round: ' + (data + 1);
    })
    ).subscribe(data => {
      console.log('Subscription: ' + data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Subscription Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
