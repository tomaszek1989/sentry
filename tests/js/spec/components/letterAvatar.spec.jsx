import React from 'react';
import TestUtils from 'react-dom/test-utils';
import LetterAvatar from 'app/components/letterAvatar';

describe('LetterAvatar', function() {
  const USER_1 = {
    identifier: 'janedoe@example.com',
    displayName: 'Jane Doe',
  };
  const USER_2 = {
    identifier: 'johnsmith@example.com',
    displayName: 'johnsmith@example.com',
  };
  const USER_3 = {
    identifier: 'foo@example.com',
    displayName: 'foo@example.com',
  };
  const USER_4 = {
    identifier: '2',
    displayName: '',
  };
  const USER_5 = {
    identifier: '127.0.0.1',
    displayName: '',
  };
  const USER_6 = {
    identifier: 'janedoe@example.com',
    displayName: 'Jane Doe ',
  };
  const USER_7 = {
    identifier: 'janedoe@example.com',
    displayName: ' ',
  };
  const USER_8 = {
    identifier: 'janedoe@example.com',
    displayName: '\u2603super \u2603duper',
  };
  const USER_9 = {
    identifier: 'janedoe@example.com',
    displayName: 'jane austen doe',
  };

  describe('getInitials()', function() {
    it('should get initials based on name', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_1} />);
      expect(letterAvatar.getInitials()).toEqual('JD');
    });

    it('should get initials based on email', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_2} />);
      expect(letterAvatar.getInitials()).toEqual('J');
    });

    it('should get initials based on username', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_3} />);
      expect(letterAvatar.getInitials()).toEqual('F');
    });

    it('should show question mark if user has no display name', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_4} />);
      expect(letterAvatar.getInitials()).toEqual('?');
    });

    it('should show question mark even if display name is a space', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_7} />);
      expect(letterAvatar.getInitials()).toEqual('?');
    });

    it('should get initials based on name even if there are trailing spaces', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_6} />);
      expect(letterAvatar.getInitials()).toEqual('JD');
    });

    it('should not slice multibyte characters in half', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_8} />);
      expect(letterAvatar.getInitials()).toEqual('\u2603\u2603');
    });

    it('should pick most last name', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_9} />);
      expect(letterAvatar.getInitials()).toEqual('JD');
    });
  });

  describe('getColor()', function() {
    it('should return a color based on email', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_1} />);
      expect(letterAvatar.getColor()).toEqual('#f868bc');
    });

    it('should return a color based on username', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_3} />);
      expect(letterAvatar.getColor()).toEqual('#315cac');
    });

    it('should return a color based on id', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_4} />);
      expect(letterAvatar.getColor()).toEqual('#57be8c');
    });

    it('should return a color based on ip address', function() {
      const letterAvatar = TestUtils.renderIntoDocument(<LetterAvatar {...USER_5} />);
      expect(letterAvatar.getColor()).toEqual('#ec5e44');
    });
  });
});
