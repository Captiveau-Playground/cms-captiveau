import * as migration_20260816_062244 from './20260816_062244';
import * as migration_20260822_075057 from './20260822_075057';

export const migrations = [
  {
    up: migration_20260816_062244.up,
    down: migration_20260816_062244.down,
    name: '20260816_062244',
  },
  {
    up: migration_20260822_075057.up,
    down: migration_20260822_075057.down,
    name: '20260822_075057'
  },
];
