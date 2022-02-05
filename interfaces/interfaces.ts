import {
  DidReceiveGlobalSettings,
  KeyUp,
  WillAppear,
  WillDisappear,
} from './incoming.interfaces';

export type WsMessages = IncomingMessages | OutgoingMessages;

export type IncomingMessages =
  | WillAppear
  | WillDisappear
  | DidReceiveGlobalSettings
  | GetGlobalSettings
  | KeyUp;

export type OutgoingMessages =
  | SetTitle
  | RegisterPlugin
  | SetImage
  | SetGlobalSettings;

export interface RegisterPlugin {
  event: 'registerPlugin';
  uuid: string;
}

export interface SetTitle {
  event: 'setTitle';
  context: string;
  payload: {
    title: string;
    target: 0 | 1 | 2;
    state: number;
  };
}

export interface SetImage {
  event: 'setImage';
  context: string;
  payload: {
    image: string;
    target: 0 | 1 | 2;
    state: number;
  };
}

export interface GetGlobalSettings {
  event: 'getGlobalSettings';
  context: string;
}

export interface SetGlobalSettings {
  event: 'setGlobalSettings';
  context: string;
  payload: any;
}
