let id = 0;
export function setVolumeDown() {
  return {
    id: `volumedown_${id++}`,
    type: 'request',
    uri: 'ssap://audio/volumeDown',
  };
}

export function setVolumeUp() {
  return {
    id: `volumeup_${id++}`,
    type: 'request',
    uri: 'ssap://audio/volumeUp',
  };
}

export function setMute(mute: boolean) {
  return {
    id: `volumeup_${id++}`,
    type: 'request',
    uri: 'ssap://audio/setMute',
    payload: { mute },
  };
}

export function setVolume(volume: number) {
  return {
    id: `volumeup_${id++}`,
    type: 'request',
    uri: 'ssap://audio/setVolume',
    payload: { volume },
  };
}

export function setChannelUp() {
  return {
    id: `volumedown_${id++}`,
    type: 'request',
    uri: 'ssap://tv/channelUp',
  };
}

export function setChannelDown() {
  return {
    id: `volumedown_${id++}`,
    type: 'request',
    uri: 'ssap://tv/channelDown',
  };
}

export function enter() {
  return 'type:button\nname:ENTER\n\n';
}

export function one() {
  return 'type:button\nname:1\n\n';
}

export function two() {
  return 'type:button\nname:2\n\n';
}

export function three() {
  return 'type:button\nname:3\n\n';
}

export function four() {
  return 'type:button\nname:4\n\n';
}

export function five() {
  return 'type:button\nname:5\n\n';
}

export function six() {
  return 'type:button\nname:6\n\n';
}

export function seven() {
  return 'type:button\nname:7\n\n';
}

export function eight() {
  return 'type:button\nname:8\n\n';
}

export function nine() {
  return 'type:button\nname:9\n\n';
}

export function zero() {
  return 'type:button\nname:0\n\n';
}

export function back() {
  return 'type:button\nname:BACK\n\n';
}
