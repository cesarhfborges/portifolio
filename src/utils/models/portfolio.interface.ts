import Profile from './profile.interface';
import About from './about.interface';


export default interface Portfolio {
  profile: Profile;
  about: About;
  // projects?: Project[];
  // skills?: Skill[];
  // experiences?: Experience[];
  // sections?: Section[];
  // meta?: { locale: Locale; lastUpdated?: string };
}
