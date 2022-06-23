import { Profile } from './profile.interface';

export interface ProfileWithSettings extends Profile {
  tfa: boolean;
}
