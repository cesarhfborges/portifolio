import {LocalizedString} from '@angular/compiler';
import Contact from './contact.interface';
import {GenderType} from '../types/gender.type';

export default interface Profile {
  lang: string;
  displayName: LocalizedString;
  firstName: string;
  lastName: string;
  gender: GenderType;
  birthday: Date;
  contacts: Contact[];
  emails: Contact[];
  // title: LocalizedString;
  // shortBio: LocalizedString;
  // about: LocalizedString;
  // socials?: SocialLink[];
  // sections?: Section[];
}
