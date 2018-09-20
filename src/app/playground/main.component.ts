import { Component, OnInit } from '@angular/core';
import { interval, of, race } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { concatAll, delay, filter, map, take, takeUntil, tap } from 'rxjs/operators';

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

    setMockPromiseDelay(promiseDelaySec) {
        this.mockPromiseDelay = promiseDelaySec;
    }

    setRejectsBeforeResolve(rejects) {
        this.rejectsBeforeResolve = rejects;
    }

    setTimeout(timeoutSec) {
        this.timeout = timeoutSec;
    }

    expectResult(timeoutSec, promiseDelaySec, rejectsBeforeResolve) {
        const promiseResolveSec = promiseDelaySec * (rejectsBeforeResolve * 1000 / 1000 + 1);
        if (promiseResolveSec > timeoutSec) {
            return 'timeout will happen';
        } else if (promiseResolveSec < timeoutSec) {
            return 'promise will be resolved';
        } else {
            return 'race condition';
        }
    }

    start() {
        this.started = true;
        this.output = [];

        this.timer$ = this.createTimer(this.timeout);

        /**
         * An Observable that will fire an event periodically.
         */
        this.mockPromiseSequence$ = this.concatObs(
            this.createResponseGenertor(this.mockPromiseDelay, this.rejectsBeforeResolve)
        );

        const resolve$ = this.mockPromiseSequence$.pipe(filter((v) => v === this.RESOLVED));

        // tap will cause duplicate values for some reason
        const reject$ = this.mockPromiseSequence$.pipe(filter((v) => v === this.REJECTED));
        reject$.subscribe((v) => this.output.push(v));

        const winner$ = race(this.timer$, resolve$);

        winner$.subscribe(
            (v) => {
                this.started = true;
                this.output.push(v);
            }, (err) => {
                this.started = false;
                this.output.push(err);
            }, () => {
                this.started = false;
                this.output.push('completed');
            });

        this.tick$ = this.createTick(this.TICK_SEC, Math.ceil(this.timeout / this.TICK_SEC));
        this.tick$.pipe(takeUntil(winner$)).subscribe((v) => this.output.push(v));
    }

    private createTick(tickSec: number, tickTimes: number): Observable<number> {
        return interval(tickSec * 1000).pipe(take(tickTimes));
    }

    private createTimer(timeoutSec: number): Observable<string> {
        return of('timeout').pipe(delay(timeoutSec * 1000));
    }

    /**
     * Create a list of Observable that will fire event after a certain delay.
     *
     * @param delaySec
     * @param rejectTimes
     */
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

    /**
     * Concat a list of Observables into one Observable.
     *
     * @param orderedEvents
     */
    private concatObs(orderedEvents: Observable<string>[]): Observable<string> {
        return interval(100).pipe(
            take(orderedEvents.length),
            map((i) => orderedEvents[i]),
            concatAll()
        );
    }
}
