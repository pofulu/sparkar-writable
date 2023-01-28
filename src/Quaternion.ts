import Reactive from 'Reactive';
import uuid from './uuid';

export default class Quaternion {
  private _signal: QuaternionSignal;
  private _x: ScalarSignalSource;
  private _y: ScalarSignalSource;
  private _z: ScalarSignalSource;
  private _w: ScalarSignalSource;

  constructor(w: number, x: number, y: number, z: number) {
    const id = uuid();
    this._x = Reactive.scalarSignalSource(id + 'x');
    this._y = Reactive.scalarSignalSource(id + 'y');
    this._z = Reactive.scalarSignalSource(id + 'z');
    this._w = Reactive.scalarSignalSource(id + 'w');
    this._signal = Reactive.quaternion(this._w.signal, this._x.signal, this._y.signal, this._z.signal);
    this.set(w, x, y, z);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }

  get w() {
    return this._w;
  }

  get signal() {
    return this._signal;
  }

  set(positionArray: Partial<[number | ScalarSignal, number | ScalarSignal, number | ScalarSignal, number | ScalarSignal]>): void;
  set(w: number | ScalarSignal, x: number | ScalarSignal, y: number | ScalarSignal, z: number | ScalarSignal): void;
  set(positionObject: { x: number | ScalarSignal, y: number | ScalarSignal, z: number | ScalarSignal, w: number | ScalarSignal }): void;
  set(...args: [positionArray: Partial<[number | ScalarSignal, number | ScalarSignal, number | ScalarSignal, number | ScalarSignal]>] | [w: number | ScalarSignal, x: number | ScalarSignal, y: number | ScalarSignal, z: number | ScalarSignal] | [positionObject: { x: number | ScalarSignal; y: number | ScalarSignal; z: number | ScalarSignal; w: number | ScalarSignal; }]) {
    if (args.length == 4) {
      this.w.set(args[0]);
      this.x.set(args[1]);
      this.y.set(args[2]);
      this.z.set(args[3]);
    } else if (args.length == 1) {
      if (Array.isArray(args[0])) {
        this.w.set(args[0][0]);
        this.x.set(args[0][1]);
        this.y.set(args[0][2]);
        this.z.set(args[0][3]);
      } else {
        this.x.set(args[0].x);
        this.y.set(args[0].y);
        this.z.set(args[0].z);
        this.w.set(args[0].w);
      }
    }
  }

  dispose() {
    this.x.dispose();
    this.y.dispose();
    this.z.dispose();
    this.w.dispose();
  }
}