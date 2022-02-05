import { GetGlobalSettings } from './interfaces/interfaces';

export function getGlobalSettings(context: string): GetGlobalSettings {
  return {
    event: 'getGlobalSettings',
    context,
  };
}
