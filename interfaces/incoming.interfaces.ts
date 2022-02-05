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
