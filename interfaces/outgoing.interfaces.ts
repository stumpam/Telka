import { WillAppear } from './incoming.interfaces';
import { RegisterPlugin, SetGlobalSettings, SetImage } from './interfaces';

export function registerPlugin(
  event: 'registerPlugin',
  uuid: string,
): RegisterPlugin {
  return {
    event,
    uuid,
  };
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
