import { ComponentsLibraryModule } from './components-library.module';

describe('ComponentsLibraryModule', () => {
  let componentsLibraryModule: ComponentsLibraryModule;

  beforeEach(() => {
    componentsLibraryModule = new ComponentsLibraryModule();
  });

  it('should create an instance', () => {
    expect(componentsLibraryModule).toBeTruthy();
  });
});
