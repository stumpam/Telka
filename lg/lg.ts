import {
  EMPTY,
  filter,
  map,
  merge,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { getGlobalSettings } from '../actions';
import {
  isDidReceiveGlobalSettings,
  isWillAppear,
} from '../interfaces/incoming.interfaces';
import { setGlobalSettings } from '../interfaces/outgoing.interfaces';
import { ws } from '../main';
import handshake from './handshake.json';

export let lg: WebSocketSubject<any> | null = null;
export let lgPointer: WebSocketSubject<any> | null = null;

export function connectToLg(context: string): Observable<any> {
  if (lg) return of(lg);

  let pointer = true;

  return ws!.pipe(
    filter(isWillAppear),
    switchMap((msg) =>
      merge(
        ws?.pipe(filter(isDidReceiveGlobalSettings)) || of(''),
        of('').pipe(
          tap(() => ws?.next(getGlobalSettings(context))),
          switchMap(() => EMPTY),
        ),
      ),
    ),
    filter((x) => !!x),
    take(1),
    map((settings) => {
      const url =
        typeof settings !== 'string' && settings?.payload.settings.url;
      lg = webSocket(url || 'ws://192.168.0.13:3000');

      return settings;
    }),
    switchMap((settings) => {
      const register = handshake;

      if (typeof settings !== 'string' && settings?.payload.settings.key) {
        register.payload['client-key'] = settings?.payload.settings.key;
      }

      lg?.next(register);
      return lg!;
    }),
    tap((msg) => {
      if (!msg.payload['client-key']) return;

      ws?.next(setGlobalSettings(context, { key: msg.payload['client-key'] }));
    }),
    tap((msg) => {
      if (!pointer) return;

      pointer = false;

      lg?.next({
        id: 'pointer_1',
        type: 'request',
        uri: 'ssap://com.webos.service.networkinput/getPointerInputSocket',
      });

      // lg?.next({
      //   id: 'status_1',
      //   type: 'subscribe',
      //   uri: 'ssap://audio/getMute',
      // });
      // lg?.next({
      //   id: 'input_3',
      //   type: 'request',
      //   uri: 'ssap://tv/getExternalInputList',
      // });
      // lg?.next({
      //   id: 'status_4',
      //   type: 'subscribe',
      //   uri: 'ssap://audio/getVolume',
      // });
      // lg?.next({
      //   id: 'channels_5',
      //   type: 'subscribe',
      //   uri: 'ssap://tv/getCurrentChannel',
      // });
      // lg?.next({
      //   id: 'test10',
      //   type: 'request',
      //   uri: 'ssap://com.webos.applicationManager/getForegroundAppInfo',
      // });
      // lg?.next({
      //   id: 'sysinfo_9',
      //   type: 'request',
      //   uri: 'ssap://system/getSystemInfo',
      // });
      // lg?.next({
      //   id: 'program_8',
      //   type: 'subscribe',
      //   uri: 'ssap://tv/getChannelCurrentProgramInfo',
      // });
      // lg?.next({
      //   id: 'channels_7',
      //   type: 'request',
      //   uri: 'ssap://tv/getChannelList',
      // });
      // lg?.next({
      //   id: 'launcher_6',
      //   type: 'request',
      //   uri: 'ssap://com.webos.applicationManager/listLaunchPoints',
      // });
      // lg?.next({
      //   id: 'pointer_1',
      //   type: 'request',
      //   uri: 'ssap://com.webos.service.networkinput/getPointerInputSocket',
      // });
    }),
    tap(console.log),
  );
}

export function connectToPointer(): Observable<any> {
  if (lgPointer) return lgPointer;

  return lg!.pipe(
    filter((resp) => resp.id === 'pointer_1'),
    take(1),
    switchMap((msg) => {
      lgPointer = webSocket({
        url: msg.payload.socketPath,
        serializer: (msg) => msg,
      });

      return lgPointer;
    }),
  );
}

export function unsubscribeLg(): void {
  lgPointer?.unsubscribe();
  lgPointer = null;
  lg?.unsubscribe();
  lg = null;
}
