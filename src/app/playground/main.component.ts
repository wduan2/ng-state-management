import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { delay, take, takeUntil, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-playground',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    TICK_LENGTH = 1000;

    TICK_TIMES = 10;

    private tick$: Observable<number>;

    private fakePromise$: Observable<string>;

    started = false;

    fakePromiseDelay = 2000;

    fakePromiseDelayOptions = [2, 4, 8, 12];

    output = [];

    ngOnInit() {
        this.fakePromiseDelay = this.fakePromiseDelayOptions[0] * 1000;
    }

    setFakePromiseDelay(delayInSeconds) {
        this.fakePromiseDelay = delayInSeconds * 1000;
    }

    start() {
        this.started = true;
        this.fakePromise(this.fakePromiseDelay);
        this.createNewTick();
        this.output = [];

        this.tick$.pipe(
            takeUntil(this.fakePromise$)
        ).subscribe(
            (v) => {
                this.output.push(v);
            },
            (err) => {
                this.started = false;
            },
            () => {
                this.output.push('completed');
                this.started = false;
            });
    }

    private createNewTick() {
        this.tick$ = interval(this.TICK_LENGTH).pipe(take(this.TICK_TIMES));
    }

    private fakePromise(ms) {
        this.fakePromise$ = of('done').pipe(delay(ms));
    }
}
