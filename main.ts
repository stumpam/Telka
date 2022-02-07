import {
  combineLatest,
  filter,
  startWith,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import {
  isKeyUp,
  isWillAppear,
  isWillDisappear,
  WillAppear,
  WillDisappear,
} from './interfaces/incoming.interfaces';
import { IncomingMessages, OutgoingMessages } from './interfaces/interfaces';
import {
  isLgMute,
  isLgProgram,
  isLgVolume,
  LgMute,
  LgProgram,
  LgVolume,
} from './interfaces/lg.interface';
import {
  registerPlugin,
  setImage,
  setSettings,
  setState,
} from './interfaces/outgoing.interfaces';
import {
  back,
  button,
  enter,
  setChannel,
  setChannelDown,
  setChannelUp,
  setMute,
  setVolume,
  setVolumeDown,
  setVolumeUp,
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

let lastLgMsgs: { volume: LgVolume | null; program: LgProgram | null } = {
  volume: null,
  program: null,
};

function connectElgatoStreamDeckSocket(
  inPort: string,
  inPluginUUID: string,
  inRegisterEvent: 'registerPlugin',
) {
  ws = webSocket<IncomingMessages | OutgoingMessages>(
    `ws://127.0.0.1:${inPort}`,
  );

  let actions: WillAppear[] = [];

  let subs: Subscription | undefined;

  ws.pipe(
    filter(isKeyUp),
    tap((msg) => {
      const commands = {
        'eu.stumpa.telka.volume_down': setVolumeDown(),
        'eu.stumpa.telka.volume_up': setVolumeUp(),
        'eu.stumpa.telka.channel_down': setChannelDown(),
        'eu.stumpa.telka.channel_up': setChannelUp(),
        'eu.stumpa.telka.mute': setMute(!!!msg.payload.state),
        'eu.stumpa.telka.setvolume': setVolume(msg.payload.settings.volume),
        'eu.stumpa.telka.setchannel': setChannel(msg.payload.settings.channel),
      };

      const pointerCommands = {
        'eu.stumpa.telka.channel': button(msg.payload.settings.button),
        'eu.stumpa.telka.enter': enter(),
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
  ).subscribe();

  ws.pipe(filter((msg) => isWillAppear(msg) || isWillDisappear(msg))).subscribe(
    (msg) => {
      if (isWillAppear(msg)) {
        actions.push(msg);

        if (actions.length === 1) {
          const sub = connectToLg(inPluginUUID)
            .pipe(
              take(1),
              switchMap(() =>
                combineLatest([lg!, connectToPointer().pipe(startWith(null))]),
              ),
            )
            .subscribe(([lgMsg]: [LgMute | LgProgram, any]) => {
              if (isLgMute(lgMsg)) {
                const msg = actions.find(
                  (a) => a.action === 'eu.stumpa.telka.mute',
                );

                if (!msg) return;

                ws?.next(setState(msg, +lgMsg.payload.mute));
              } else if (isLgProgram(lgMsg)) {
                const action = actions.find(
                  (a) => a.action === 'eu.stumpa.telka.info',
                );

                if (!action) return;
                ws?.next(
                  setSettings(action.context, {
                    ...action.payload.settings,
                    channelId: lgMsg.payload.channelId,
                  }),
                );

                lastLgMsgs.program = lgMsg;
                nowPlaying(action);
              } else if (isLgVolume(lgMsg)) {
                const action = actions.find(
                  (a) => a.action === 'eu.stumpa.telka.info',
                );
                if (!action) return;

                lastLgMsgs.volume = lgMsg;
                nowPlaying(action);
              }
            });

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

  ws.next(registerPlugin(inRegisterEvent, inPluginUUID));
}

function nowPlaying(action: WillAppear): void {
  const canvas = document.createElement('canvas');
  canvas.width = 144;
  canvas.height = 144;

  const ctx = canvas.getContext('2d')!;
  //0aa74766b754a07e334b50d240c3ca55
  ctx.font = '25px Arial';
  ctx.fillStyle = '#FFF';

  ctx.fillText(lastLgMsgs.volume?.payload.volume.toString() || '?', 15, 27);
  ctx.fillText(lastLgMsgs.program?.payload.channelName || '', 15, 50);
  ctx.fillText(
    lastLgMsgs.program?.payload.programName.toString() || '?',
    15,
    75,
  );
  ctx.fillText(
    lastLgMsgs.program?.payload.localEndTime
      .split(',')
      .splice(3, 2)
      .join(':')
      .toString() || '?',
    15,
    100,
  );

  const img = canvas.toDataURL();

  ws?.next(setImage(action, img));
}

(window as any)['connectElgatoStreamDeckSocket'] =
  connectElgatoStreamDeckSocket;
