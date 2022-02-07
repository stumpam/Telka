export interface LgMute {
  type: 'response';
  id: 'status';
  payload: {
    mute: boolean;
    returnValue: boolean;
    subscribed: boolean;
  };
}

export function isLgMute(msg: LgMute | LgProgram): msg is LgMute {
  return msg.id === 'status';
}

export interface LgProgram {
  type: 'response';
  id: 'program';
  payload: {
    channelName: string;
    channelNumber: string;
    channelId: string;
    programName: string;
    localStartTime: string;
    localEndTime: string;
  };
}

// 2022, 02, 07, 19, 54, 00;

export function isLgProgram(msg: LgMute | LgProgram): msg is LgProgram {
  return msg.id === 'program';
}

export interface LgVolume {
  type: 'response';
  id: 'volume';
  payload: {
    volume: number;
  };
}

export function isLgVolume(
  msg: LgMute | LgProgram | LgVolume,
): msg is LgVolume {
  return msg.id === 'volume';
}
