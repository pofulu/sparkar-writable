import Reactive from 'Reactive';
import uuid from './uuid';

export default class Pack3 {
  private _signal: PointSignal;
  private _x: ScalarSignalSource;
  private _y: ScalarSignalSource;
  private _z: ScalarSignalSource;

  constructor(x?: number, y?: number, z?: number) {
    const id = uuid();
    this._x = Reactive.scalarSignalSource(id + 'x');
    this._y = Reactive.scalarSignalSource(id + 'y');
    this._z = Reactive.scalarSignalSource(id + 'z');
    this._signal = Reactive.pack3(this._x.signal, this._y.signal, this._z.signal);
    this.set(x, y, z);
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

  get signal() {
    return this._signal;
  }


  set(positionArray: Partial<[number | ScalarSignal, number | ScalarSignal, number | ScalarSignal, number | ScalarSignal]>): void;
  set(x: number | ScalarSignal, y: number | ScalarSignal, z: number | ScalarSignal): void;
  set(positionObject: { x: number | ScalarSignal, y: number | ScalarSignal, z: number | ScalarSignal }): void;
  set(...args:
    [positionArray: Partial<[number | ScalarSignal, number | ScalarSignal, number | ScalarSignal, number | ScalarSignal]>] |
    [x: number | ScalarSignal, y: number | ScalarSignal, z: number | ScalarSignal] |
    [positionObject: { x: number | ScalarSignal; y: number | ScalarSignal; z: number | ScalarSignal; }]
  ) {
    if (args.length == 3) {
      this.x.set(args[0] ?? 0);
      this.y.set(args[1] ?? 0);
      this.z.set(args[2] ?? 0);
      return
    }

    if (args.length != 1) {
      throw `Unexpected arguments: ${args}`;
    }

    if (Array.isArray(args[0])) {
      this.x.set(args[0][0] ?? 0);
      this.y.set(args[0][1] ?? 0);
      this.z.set(args[0][2] ?? 0);
    } else {
      this.x.set(args[0].x ?? 0);
      this.y.set(args[0].y ?? 0);
      this.z.set(args[0].z ?? 0);
    }
  }

  dispose() {
    this.x.dispose();
    this.y.dispose();
    this.z.dispose();
  }
}
