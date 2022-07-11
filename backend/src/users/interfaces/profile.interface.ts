import { Match } from '@prisma/client';

export interface Profile {
  id: number;
  username: string;
  victories: number;
  losses: number;
  level: number;
  matchHistory: Match[];
  achievements: number[];
}
