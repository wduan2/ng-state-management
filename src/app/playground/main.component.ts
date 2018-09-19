import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { concatAll, delay, filter, map, merge, take, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'app-playground',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    TICK_SEC = 1;

    MOCK_PROMISE_DELAY_OPTS = [2, 4, 8, 12];

    REJECTS_BEFORE_RESOLVE_OPTS = [1, 2, 3, 4, 5];

    TIMEOUT_OPTS = [10, 15, 20, 25, 30];

    private RESOLVED = 'resolved';

    private REJECTED = 'rejected';

    private tick$: Observable<number>;

    private timer$: Observable<string>;

    private mockPromiseSequence$: Observable<string>;

    started = false;

    rejectsBeforeResolve = this.REJECTS_BEFORE_RESOLVE_OPTS[1];

    mockPromiseDelay = this.MOCK_PROMISE_DELAY_OPTS[0];

    timeout = this.TIMEOUT_OPTS[0];

    output = [];

    ngOnInit() {

    }

    setMockPromiseDelay(delaySec) {
        this.mockPromiseDelay = delaySec;
    }

    setRejectsBeforeResolve(rejects) {
        this.rejectsBeforeResolve = rejects;
    }

    setTimeout(timeoutSec) {
        this.timeout = timeoutSec;
    }

    start() {
        this.started = true;
        this.output = [];

        this.mockPromiseSequence$ = this.concatObs(this.createResponseGenertor(this.mockPromiseDelay, this.rejectsBeforeResolve));

        const captureResolved$ = this.mockPromiseSequence$.pipe(filter((v) => v === this.RESOLVED));

        this.timer$ = this.createTimer(this.timeout);

        this.timer$.pipe(
            merge(this.mockPromiseSequence$),
            takeUntil(captureResolved$)
        ).subscribe((msg) => {
            this.started = true;
            this.output.push(msg);
        }, (err) => {
            this.started = false;
        }, () => {
            this.started = false;
            // takeUntil won't pass the fired value to the 'next' block
            this.output.push(this.RESOLVED);
        });

        this.tick$ = this.createTick(this.TICK_SEC, Math.ceil(this.timeout / this.TICK_SEC));
        this.tick$.pipe(takeUntil(captureResolved$)).subscribe((v) => this.output.push(v));
    }

    private createTick(tickSec: number, tickTimes: number): Observable<number> {
        return interval(tickSec * 1000).pipe(take(tickTimes));
    }

    private createTimer(totalSec: number): Observable<string> {
        return of('timeout').pipe(delay(totalSec * 1000));
    }

    private createResponseGenertor(delaySec: number, rejectTimes: number): Observable<string>[] {
        const createRejected = () => of(this.REJECTED).pipe(delay(delaySec * 1000));

        const createResolved = () => of(this.RESOLVED).pipe(delay(delaySec * 1000));

        const orderedEvents = [];

        for (let i = 0; i < rejectTimes; i++) {
            orderedEvents.push(createRejected());
        }

        orderedEvents.push(createResolved());

        return orderedEvents;
    }

    private concatObs(orderedEvents: Observable<string>[]): Observable<string> {
        return interval(100).pipe(
            take(orderedEvents.length),
            map((i) => orderedEvents[i]),
            concatAll()
        );
    }
}
