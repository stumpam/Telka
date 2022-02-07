import { filter, take } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import {
  isPropertyInspectorDidDisappear,
} from '../interfaces/incoming.interfaces';
import {
  ActionInfo,
  IncomingMessages,
  OutgoingMessages,
} from '../interfaces/interfaces';
import {
  registerPropertyInspector,
  setSettings,
} from '../interfaces/outgoing.interfaces';

export let ws: WebSocketSubject<IncomingMessages | OutgoingMessages> | null =
  null;

function connectElgatoStreamDeckSocket(
  inPort: string,
  inPluginUUID: string,
  inRegisterEvent: 'registerPropertyInspector',
  inInfo: unknown,
  inActionInfo: string,
) {
  ws = webSocket<IncomingMessages | OutgoingMessages>(
    `ws://127.0.0.1:${inPort}`,
  );
  const actionInfo: ActionInfo = JSON.parse(inActionInfo);
  const settings = actionInfo.payload.settings;
  console.log(actionInfo);
  if (actionInfo.action === 'eu.stumpa.telka.info') {
    document.getElementsByClassName('sdpi-wrapper')[1].removeAttribute('style');

    const program = document.getElementById('program') as HTMLInputElement;
    program.value = actionInfo.payload.settings.channelId || '';
  }

  if (actionInfo.action === 'eu.stumpa.telka.channel') {
    document.getElementsByClassName('sdpi-wrapper')[0].removeAttribute('style');

    const label = document.getElementById('label');
    label!.innerText = 'Tlačítko na ovladači';

    const value = document.getElementById('value') as HTMLInputElement;
    value.min = '0';
    value.max = '9';
    value.value = settings.button ?? '';

    value.onchange = () => {
      const button = +value.value;
      if (!(0 <= button && button <= 9)) return;

      const newSettings = { ...settings, button };

      ws?.next(setSettings(inPluginUUID, newSettings));
    };
  }

  if (actionInfo.action === 'eu.stumpa.telka.setchannel') {
    document.getElementsByClassName('sdpi-wrapper')[0].removeAttribute('style');

    const label = document.getElementById('label');
    label!.innerText = 'ID kanálu';

    const value = document.getElementById('value') as HTMLInputElement;
    value.type = 'string';
    value.maxLength = 20;
    value.value = settings.channel ?? '';

    value.onchange = () => {
      const channel = value.value;
      if (!(channel.length <= 20)) return;

      const newSettings = { ...settings, channel };

      ws?.next(setSettings(inPluginUUID, newSettings));
    };
  }

  if (actionInfo.action === 'eu.stumpa.telka.setvolume') {
    document.getElementsByClassName('sdpi-wrapper')[0].removeAttribute('style');

    const label = document.getElementById('label');
    label!.innerText = 'Hlasitost';

    const value = document.getElementById('value') as HTMLInputElement;
    value.min = '0';
    value.max = '20';
    value.value = settings.volume ?? '';

    value.onchange = () => {
      const volume = +value.value;
      if (!(0 <= volume && volume <= 20)) return;

      const newSettings = { ...settings, volume };

      ws?.next(setSettings(inPluginUUID, newSettings));
    };
  }

  ws.next(registerPropertyInspector(inRegisterEvent, inPluginUUID));
  ws.pipe(filter(isPropertyInspectorDidDisappear), take(1)).subscribe();
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
