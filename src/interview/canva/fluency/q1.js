// const { Observable } = window.rxjs;

// /** An Observable instance; can emit values at any time. Can be subscribed to by any number of observers */
// interface Observable<T> {
//   constructor(
//     subscriber: (observer: Observer<T>) => UnsubscribeFn | undefined
//   ): Observable<T>;
//   subscribe(observer: Observer<T>): Subscription<T>;
// }

// /** An Observer; Consumes values emitted by an observable */
// interface Observer<T> {
//   next(value: T): void;
//   error(err: Error): void;
//   complete(): void;
// }

// /** A Subscription instance describes the relationship between an observable and one of it's observers */
// interface Subscription<T> {
//   unsubscribe(): void;
// }

// /** A cleanup function that is called when unsubscribing to an Observable */
// type UnsubscribeFn = () => void;

// subscriber: (observer: Observer<T>) => UnsubscribeFn | undefined

class Observable {
  constructor(subscriber) {
    this.subscriber = subscriber;
  }

  // complet(): next: () => {}
  subscribe(observer) {
    let complete = false;

    let originComplete = observer.complete;

    observer.complete = () => {
      complete = true;
      originComplete();
    };

    let originNext = observer.next;

    observer.next = (...args) => {
      if (complete) {
        return;
      }
      originNext(...args);
    };

    const unsub = this.subscriber(observer);

    return {
      unsubscribe: unsub,
    };
  }
}

// // Obvers

// // Add this to the top of index.js

// Simple counter example
// const counter = new Observable((observer) => {
//   for (let i = 0; i < 10; i++) {
//     observer.next(i);
//   }
// });
// counter.subscribe({ next: console.log }); // 0, 1, 2, 3 ... 9

// // Completing example

// const completingObservable = new Observable((observer) => {
//   observer.next("Start");
//   observer.next("Middle");
//   observer.next("End");
//   observer.complete();
//   // The following should not be delivered:
//   observer.next("Epilogue");
// });
// completingObservable.subscribe({
//   next: console.log,
//   complete: () => console.log("Complete!"),
// });

// // Error example

// const fetchObservable = new Observable((observer) => {
//   fetch("http://fake.url.com/etc")
//     .then((res) => observer.next(res))
//     .catch((err) => observer.error(err));
// });
// fetchObservable.subscribe({
//   next: console.log,
//   error: (err) => console.warn(err),
// });

// Unsubscribe example

const toggleButton = document.getElementById("toggle");
const clickButton = document.getElementById("click");

const clickEvents = new Observable((observer) => {
  const handler = (event) => observer.next(event);
  clickButton.addEventListener("click", handler, true);
  return () => {
    clickButton.removeEventListener("click", handler, true);
  };
});

let clickEventsSubscription; // unsub { unsubscribe }

function toggle() {
  if (clickEventsSubscription) {
    clickEventsSubscription.unsubscribe();
    clickEventsSubscription = undefined;
    toggleButton.innerText = "Listen";
    return;
  }
  clickEventsSubscription = clickEvents.subscribe({ next: console.log });
  toggleButton.innerText = "Stop Listening";
}

toggleButton.addEventListener("click", toggle);

export const main = async () => {
  // console.log("Hi");
};
