export class MockAngularFireauth{
  private users;

  constructor() {
    this.users = [
      {
        id: '#@##$$$123',
        userName: 'some description'
      },
      {
        id: '123qwe@#$',
        userName: 'Hey this is fancy description'
      }
    ];
  }
}
