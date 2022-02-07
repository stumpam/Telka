import { WillAppear } from './incoming.interfaces';
import {
  ActionInfo,
  RegisterPlugin,
  SetGlobalSettings,
  SetImage,
} from './interfaces';

export function registerPlugin(
  event: 'registerPlugin',
  uuid: string,
): RegisterPlugin {
  return {
    event,
    uuid,
  };
}

export function registerPropertyInspector(
  event: 'registerPropertyInspector',
  uuid: string,
): RegisterPropertyInspector {
  return {
    event,
    uuid,
  };
}

export interface RegisterPropertyInspector {
  event: 'registerPropertyInspector';
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

export function setTitle(msg: WillAppear, title: string, state = 0): SetTitle {
  return {
    event: 'setTitle',
    context: msg.context,
    payload: {
      title,
      target: 0,
      state,
    },
  };
}

export function setImage(msg: WillAppear, image: string, state = 0): SetImage {
  return {
    event: 'setImage',
    context: msg.context,
    payload: {
      image,
      target: 0,
      state,
    },
  };
}

export function setGlobalSettings(
  context: string,
  payload: any,
): SetGlobalSettings {
  return {
    event: 'setGlobalSettings',
    context,
    payload,
  };
}

export interface SetSettings {
  event: 'setSettings';
  context: string;
  payload: any;
}

export function setSettings(context: string, payload: any): SetSettings {
  return {
    event: 'setSettings',
    context,
    payload,
  };
}

export interface SendToPlugin {
  action: string;
  event: 'sendToPlugin';
  context: string;
  payload: any;
}

export function sendToPlugin(
  actionInfo: ActionInfo,
  payload: any,
): SendToPlugin {
  return {
    action: actionInfo.action,
    event: 'sendToPlugin',
    context: actionInfo.context,
    payload,
  };
}

export interface SetState {
  action: string;
  event: 'setState';
  context: string;
  payload: { state: number };
}

export function setState(msg: WillAppear, state: number): SetState {
  return {
    action: msg.action,
    event: 'setState',
    context: msg.context,
    payload: { state },
  };
}
