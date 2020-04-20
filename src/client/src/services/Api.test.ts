import { Api } from './Api';
import { InitialData } from '../models/InitialData';
import { Family } from '../models/Family';

describe('Api class', () => {
  let sendRequestSpy: jest.Mock;
  let sut: Api;

  beforeEach(() => {
    sendRequestSpy = jest.fn();
    sut = new Api('rootString');
    sut._sendRequest = sendRequestSpy;
  });

  describe('getInitialData method', () => {
    it('returns the result of a GET call to user', async () => {
      const responseData: InitialData = {
        currentUser: 1,
        families: [],
        invitations: [],
        users: []
      };
      sendRequestSpy.mockResolvedValue(responseData);
      const result = await sut.getInitialData();

      expect(result).toBe(responseData);
      expect(sendRequestSpy).toHaveBeenCalledWith('user');
    });
  });

  describe('family and invitation methods', () => {
    let responseData: Family;
    beforeEach(() => {
      responseData = {
        creator: {
          id: 1,
          name: 'me',
          avatar: '',
          email: '',
          families: [],
          isLoggedIn: true
        },
        id: 1,
        members: [],
        name: 'my family'
      };
      sendRequestSpy.mockResolvedValue(responseData);
    });

    it('createFamily returns the result of a PUT call to family', async () => {
      const result = await sut.createFamily('my family');

      expect(result).toBe(responseData);
      expect(sendRequestSpy).toHaveBeenCalledWith('family', 'PUT', 'my family');
    });

    it('inviteMemberToFamily returns the result of a PUT call to family/id/members', async () => {
      const result = await sut.inviteMemberToFamily('new.member@email.com', 1);

      expect(result).toBe(responseData);
      expect(sendRequestSpy).toHaveBeenCalledWith('family/1/members', 'PUT', 'new.member@email.com');
    });

    it('acceptInvitation returns the result of a POST call to invitation/id/accept', async () => {
      const result = await sut.acceptInvitation(1);

      expect(result).toBe(responseData);
      expect(sendRequestSpy).toHaveBeenCalledWith('invitation/1/accept', 'POST');
    });

    it('rejectInvitation returns the result of a POST call to invitation/id/reject', async () => {
      const result = await sut.rejectInvitation(1);

      expect(result).toBe(responseData);
      expect(sendRequestSpy).toHaveBeenCalledWith('invitation/1/reject', 'POST');
    });
  });
});
