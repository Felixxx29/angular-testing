import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("async tescting examples", () => {
  it("async testing example with jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it("async testing example - setTimeout", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);

    flush();

    expect(test).toBeTruthy();
  }));

  it("async testing example - plain promise", fakeAsync(() => {
    let test = false;

    Promise.resolve()
      .then(() => {
        return Promise.resolve();
      })
      .then(() => {
        test = true;
      });

    flushMicrotasks();

    expect(test).toBeTruthy();
  }));

  it("async testing example - promise + settimeout", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(1000);

    expect(counter).toBe(11);
  }));

  it("async testing example - Observables", fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(500));

    test$.subscribe(() => {
      test = true;
    });
    tick(1000)
    expect(test).toBe(true);
  }));
});
