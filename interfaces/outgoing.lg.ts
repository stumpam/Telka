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

export function setChannel(channelId: string) {
  return {
    id: `channel_${id++}`,
    type: 'request',
    uri: 'ssap://tv/openChannel',
    payload: {
      channelId,
    },
  };
}

export function enter() {
  return 'type:button\nname:ENTER\n\n';
}

export function button(button: number) {
  return `type:button\nname:${button}\n\n`;
}

export function back() {
  return 'type:button\nname:BACK\n\n';
}
