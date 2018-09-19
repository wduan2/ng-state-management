import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { delay, take, takeUntil, race } from 'rxjs/operators';

@Component({
    selector: 'app-playground',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    TICK_LENGTH = 1000;

    TICK_TIMES = 10;

    private tick$: Observable<number>;

    private background$: Observable<string>;

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
        this.createNewFakePromise(this.fakePromiseDelay);
        this.createNewTick();
        this.createNewBackground();
        this.output = [];

        this.background$.pipe(race(this.fakePromise$)).subscribe(
            (msg) => {
                this.started = true;
                this.output.push(msg);
            },
            (err) => {
                this.started = false;
            },
            () => {
                this.started = false;
            }
        );

        this.tick$.pipe(takeUntil(this.fakePromise$)).subscribe((v) => this.output.push(v));
    }

    private createNewTick() {
        this.tick$ = interval(this.TICK_LENGTH).pipe(take(this.TICK_TIMES));
    }

    private createNewBackground() {
        this.background$ = of('timeout').pipe(delay(this.TICK_LENGTH * this.TICK_TIMES));
    }

    private createNewFakePromise(ms) {
        this.fakePromise$ = of('resolved').pipe(delay(ms));
    }
}
