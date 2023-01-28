import Reactive from 'Reactive';
import uuid from './uuid';

export default class Pulse<T> {
  private readonly _signalSource: StringSignalSource;

  constructor() {
    this._signalSource = Reactive.stringSignalSource(uuid());
  }

  onTrigger(config?: { fireOnInitialValue?: boolean }): Omit<EventSource<T>, 'subscribe'> & { subscribe(callback: (args: T) => void): Subscription } {
    const eventSource = this._signalSource.signal.monitor(config) as any;
    eventSource.subscribe = (callback: (value: T) => void) =>
      this._signalSource.signal.monitor(config).subscribe(({ newValue }) =>
        callback(JSON.parse(newValue).value)
      );

    return eventSource;
  }

  trigger(value: T) {
    this._signalSource.set(JSON.stringify({ value, id: uuid() }));
  }

  dispose() {
    this._signalSource.dispose();
  }
}