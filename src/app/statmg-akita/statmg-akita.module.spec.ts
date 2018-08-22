import { StatmgAkitaModule } from './statmg-akita.module';

describe('StatmgAkitaModule', () => {
  let statmgAkitaModule: StatmgAkitaModule;

  beforeEach(() => {
    statmgAkitaModule = new StatmgAkitaModule();
  });

  it('should create an instance', () => {
    expect(statmgAkitaModule).toBeTruthy();
  });
});
