import { filter, mergeMap, Subscription, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import {
  isKeyUp,
  isWillAppear,
  isWillDisappear,
  WillAppear,
  WillDisappear,
} from './interfaces/incoming.interfaces';
import { IncomingMessages, OutgoingMessages } from './interfaces/interfaces';
import { registerPlugin } from './interfaces/outgoing.interfaces';
import {
  back,
  eight,
  enter,
  five,
  four,
  nine,
  one,
  setChannelDown,
  setChannelUp,
  setVolumeDown,
  setVolumeUp,
  seven,
  six,
  three,
  two,
  zero,
} from './interfaces/outgoing.lg';
import {
  connectToLg,
  connectToPointer,
  lg,
  lgPointer,
  unsubscribeLg,
} from './lg/lg';

export let ws: WebSocketSubject<IncomingMessages | OutgoingMessages> | null =
  null;

function connectElgatoStreamDeckSocket(
  inPort: string,
  inPluginUUID: string,
  inRegisterEvent: 'registerPlugin',
) {
  ws = webSocket<IncomingMessages | OutgoingMessages>(
    `ws://127.0.0.1:${inPort}`,
  );

  let actions: WillAppear[] = [];
  // let actions: Record<
  //   IncomingMessages['event'] | 'unknown',
  //   (msg: IncomingMessages) => void
  // > = {
  //   willAppear,
  //   unknown: (test: unknown) => {
  //     console.log(test);
  //   },
  //   didReceiveGlobalSettings: () => {},
  //   // deviceDidConnect: () => {},
  //   // keyDown: () => {},
  //   // keyUp: () => {},
  //   // titleParametersDidChange: () => {},
  //   // willDisappear: () => {},
  // };

  // ws.subscribe((msg) => {
  //   (actions[(msg as IncomingMessages).event] || actions['unknown'])(
  //     msg as IncomingMessages,
  //   );
  // });

  let subs: Subscription | undefined;

  ws.next(registerPlugin(inRegisterEvent, inPluginUUID));
  ws.pipe(
    filter(isKeyUp),
    tap((msg) => {
      const commands = {
        'eu.stumpa.telka.volume_down': setVolumeDown(),
        'eu.stumpa.telka.volume_up': setVolumeUp(),
        'eu.stumpa.telka.channel_down': setChannelDown(),
        'eu.stumpa.telka.channel_up': setChannelUp(),
      };

      const pointerCommands = {
        'eu.stumpa.telka.enter': enter(),
        'eu.stumpa.telka.one': one(),
        'eu.stumpa.telka.two': two(),
        'eu.stumpa.telka.three': three(),
        'eu.stumpa.telka.four': four(),
        'eu.stumpa.telka.five': five(),
        'eu.stumpa.telka.six': six(),
        'eu.stumpa.telka.seven': seven(),
        'eu.stumpa.telka.eight': eight(),
        'eu.stumpa.telka.nine': nine(),
        'eu.stumpa.telka.zero': zero(),
        'eu.stumpa.telka.back': back(),
      };

      const prep = commands[msg.action as keyof typeof commands];
      const pointerPrep =
        pointerCommands[msg.action as keyof typeof pointerCommands];

      if (prep) {
        lg?.next(prep);
      }
      if (pointerPrep) {
        lgPointer?.next(pointerPrep);
      }
    }),
  ).subscribe(console.log);

  ws.pipe(filter((msg) => isWillAppear(msg) || isWillDisappear(msg))).subscribe(
    (msg) => {
      if (isWillAppear(msg)) {
        actions.push(msg);

        if (actions.length === 1) {
          const sub = connectToLg(inPluginUUID)
            .pipe(mergeMap(() => connectToPointer()))
            .subscribe();

          subs?.add(sub);
        }
      } else {
        actions = actions.filter(
          (act) => act.action === (msg as WillDisappear).action,
        );

        if (!actions.length) {
          subs?.unsubscribe();
          unsubscribeLg();
        }
      }
    },
  );

  ws.subscribe();
}

// const willAppear = (msg: WillAppearMessage) => {
//   console.log(msg);
//   connectToLg();

//   const canvas = document.createElement('canvas');
//   canvas.width = 144;
//   canvas.height = 144;

//   const ctx = canvas.getContext('2d')!;
//   //0aa74766b754a07e334b50d240c3ca55
//   ctx.font = '22px Arial';
//   ctx.fillStyle = '#FF0000';
//   ctx.fillText('Ahojky', 50, 50);

//   const img = canvas.toDataURL();

//   ws?.next(setImage(msg, img));

//   // setTimeout(() => ws.next(setTitle(msg, 'Ahoj')), 100);
// };

(window as any)['connectElgatoStreamDeckSocket'] =
  connectElgatoStreamDeckSocket;
