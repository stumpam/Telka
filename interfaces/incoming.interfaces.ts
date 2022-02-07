import { WsMessages } from './interfaces';

export interface WillAppear {
  action: string;
  event: 'willAppear';
  context: string;
  device: string;
  payload: {
    settings: any;
    coordinates: {
      column: number;
      row: number;
    };
    state: 0 | 1 | 2;
    isInMultiAction: boolean;
  };
}

export function isWillAppear(msg: WsMessages): msg is WillAppear {
  return msg.event === 'willAppear';
}

export interface WillDisappear {
  action: string;
  event: 'willDisappear';
  context: string;
  device: string;
  payload: {
    settings: any;
    coordinates: {
      column: number;
      row: number;
    };
    state: 0 | 1 | 2;
    isInMultiAction: boolean;
  };
}

export function isWillDisappear(msg: WsMessages): msg is WillDisappear {
  return msg.event === 'willDisappear';
}

export interface DidReceiveGlobalSettings {
  event: 'didReceiveGlobalSettings';
  payload: {
    settings: any;
  };
}

export function isDidReceiveGlobalSettings(
  msg: WsMessages,
): msg is DidReceiveGlobalSettings {
  return msg.event === 'didReceiveGlobalSettings';
}

export interface DidReceiveSettings {
  action: string;
  event: 'didReceiveSettings';
  context: string;
  device: string;
  payload: {
    settings: any;
    coordinates: {
      column: number;
      row: number;
    };
    isInMultiAction: boolean;
  };
}

export function isDidReceiveSettings(
  msg: WsMessages,
): msg is DidReceiveSettings {
  return msg.event === 'didReceiveSettings';
}

export interface KeyUp {
  action: string;
  event: 'keyUp';
  context: string;
  device: string;
  payload: {
    settings: any;
    coordinates: {
      column: number;
      row: number;
    };
    state: 0 | 1 | 2;
    userDesiredState: number;
    isInMultiAction: boolean;
  };
}

export function isKeyUp(msg: WsMessages): msg is KeyUp {
  return msg.event === 'keyUp';
}

export interface PropertyInspectorDidAppear {
  action: string;
  event: 'propertyInspectorDidAppear';
  context: any;
  device: any;
}

export function isPropertyInspectorDidAppear(
  msg: WsMessages,
): msg is PropertyInspectorDidAppear {
  return msg.event === 'propertyInspectorDidAppear';
}

export interface PropertyInspectorDidDisappear {
  action: string;
  event: 'propertyInspectorDidDisappear';
  context: string;
  device: string;
}

export function isPropertyInspectorDidDisappear(
  msg: WsMessages,
): msg is PropertyInspectorDidDisappear {
  return msg.event === 'propertyInspectorDidDisappear';
}

export interface GetSettings {
  event: 'getSettings';
  context: string;
}

export function getSettings(msg: WsMessages): msg is GetSettings {
  return msg.event === 'getSettings';
}
