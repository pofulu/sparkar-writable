# Writable

Extended library for Spark ar scripting writable signal source. Currently extended the following signals:

- Pack3
- Quaternion
- Pulse



## Install

Currently you need use npm package manager to install this library:

```shell
pnpm add sparkar-writable
```

You can referecne [sparkar-bundler](https://github.com/pofulu/sparkar-bundler) for bundling npm package for Meta Spark Sutdio.



## Usage

**Pack3**

```typescript
import { Pack3 } from 'sparkar-writable';

const pack3 = new Pack3(); // x=0, y=0, z=0, you can also pass initial values.
pack3.set(2, 5, 8); // x=2, y=5, z=8
pack3.set({y: 10}); // x=2, y=10, z=8
pack3.set([1, 2, 3]) // x=1, y=2, z=3
```

**Pulse**

```typescript
import { Pulse } from 'sparkar-writable';
import Diagnostics from 'Diagnostics';
import Patches from 'Patches';

const pulse = new Pulse<number>(); 	// you can define any pulse type you like, or just void.
const onTrigger = pulse.onTrigger({ fireOnIinitalValue: true});

Patches.input.setPulse('trigger', onTrigger);
onTrigger.subscribe(value => Diagnostics.log(value));
// ▲ will log 10
pulse.trigger(10);
```

