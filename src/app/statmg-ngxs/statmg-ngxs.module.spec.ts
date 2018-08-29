import { StatmgNgxsModule } from './statmg-ngxs.module';

describe('StatmgNgxsModule', () => {
  let statmgNgxsModule: StatmgNgxsModule;

  beforeEach(() => {
    statmgNgxsModule = new StatmgNgxsModule();
  });

  it('should create an instance', () => {
    expect(statmgNgxsModule).toBeTruthy();
  });
});
