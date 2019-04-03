import { of } from 'rxjs';
export class MockTableDataService {
  private strings;

  constructor() {
    this.strings = [
      {
        id: 'LW2M6TDreVVcQlWWKf6n',
        description: 'some description',
        title: 'title 1'
      },
      {
        id: 'nDKSEri7KI0dANVtYlzo',
        description: 'Hey this is fancy description',
        title: 'another totle '
      }
    ];
  }

  getItems() {
    return of({
      json: () => this.strings
    });
  }
}
