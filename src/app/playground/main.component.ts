import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/observable';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-playground',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    private tick$: Observable<number>;

    private terminator$: Observable<{}>;

    started = false;

    output = [];

    @ViewChild('terminate')
    private terminateButton: ElementRef;

    ngOnInit() {

    }

    start() {
        this.started = true;
        this.createNewTerminator(this.terminateButton.nativeElement);
        this.createNewTick();
        this.output = [];

        this.tick$.takeUntil(this.terminator$)
            .subscribe(
                (v) => {
                    console.log(v);
                    this.output.push(v);
                },
                (err) => {
                    console.error(err);
                    this.started = false;
                },
                () => {
                    console.log('completed');
                    this.output.push('completed');
                    this.started = false;
                });
    }

    private createNewTerminator(el) {
        this.terminator$ = fromEvent(el, 'click').debounceTime(350).pipe(tap(
            () => this.output.push('terminated')
        ));
    }

    private createNewTick() {
        this.tick$ = interval(1000).take(20);
    }
}
