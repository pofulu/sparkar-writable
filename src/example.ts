import Pulse from "./Pulse";
import Diagnostics from 'Diagnostics';
import TouchGestures from 'TouchGestures';
import Patches from 'Patches';

const pulse = new Pulse<void>();
Patches.inputs.setPulse('play', pulse.onTrigger())

pulse.onTrigger().subscribe(v => {
  Diagnostics.log(0)
});

pulse.trigger();

TouchGestures.onTap().subscribe(() => {
  pulse.trigger()
})