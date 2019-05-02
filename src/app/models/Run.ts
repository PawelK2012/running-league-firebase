import { User } from '../models/User';

export interface Run {
  id?: string;
  runName?: string;
  distance?: string;
  time?: string;
  date?: string;
  user?: string[];
}
