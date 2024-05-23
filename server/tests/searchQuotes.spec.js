import { searchQuotes } from '../searchQuotes.js';

const testQuotes = [
  {
    "quote": "Kindness is a language which the deaf can hear and the blind can see.",
    "author": "Mark Twain",
  },
  {
    "quote": "I have not failed. I've just found 10,000 ways that won't work.",
    "author": "Thomas A. Train"
  },
  {
    "quote": "Your time is limited, so don't waste it living someone else's life.",
    "author": "Steve Jobs"
  }
];

describe('searchQuotes', () => {
  test('should return the first quote by author', () => {
    expect(searchQuotes({author: 'Mark Twain'},testQuotes)).toEqual(testQuotes[0])
  });

  test('return the partial name of author', () => {
    expect(searchQuotes({ author: 'Thomas'},testQuotes)).toEqual(testQuotes[1]);
  });

  test('the author search should be case insensitive', () => {
    expect(searchQuotes({ author: 'STEVE JOBS'},testQuotes)).toEqual(testQuotes[2]);
  });

  test('should return a message when no quotes are found', () => {
    expect(searchQuotes({ author: 'Unknown '},testQuotes)).toEqual({ message: 'No quotes found for the specified author.'})
  });
});
