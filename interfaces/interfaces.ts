import {
  DidReceiveGlobalSettings,
  DidReceiveSettings,
  GetSettings,
  KeyUp,
  PropertyInspectorDidAppear,
  PropertyInspectorDidDisappear,
  WillAppear,
  WillDisappear,
} from './incoming.interfaces';
import {
  RegisterPropertyInspector,
  SendToPlugin,
  SetSettings,
  SetState,
} from './outgoing.interfaces';

export type WsMessages = IncomingMessages | OutgoingMessages;

export type IncomingMessages =
  | WillAppear
  | WillDisappear
  | DidReceiveGlobalSettings
  | GetGlobalSettings
  | KeyUp
  | PropertyInspectorDidAppear
  | PropertyInspectorDidDisappear
  | GetSettings
  | DidReceiveSettings;

export type OutgoingMessages =
  | SetTitle
  | RegisterPlugin
  | SetImage
  | SetGlobalSettings
  | RegisterPropertyInspector
  | SetSettings
  | SendToPlugin
  | SetState;

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

export interface ActionInfo {
  action: string;
  context: string;
  device: string;
  payload: { coordinates: { column: number; row: number }; settings: any };
}
