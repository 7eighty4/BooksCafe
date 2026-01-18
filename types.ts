
export interface Book {
  id?: number;
  title: string;
  author: string;
  coverImage?: Blob;
  epubData: ArrayBuffer;
  added: Date;
  lastLocation?: string;
  readPercentage?: number;
  lastOpened?: Date;
}

export interface DictionaryEntry {
  id?: number;
  word: string;
  definition: string;
  added: Date;
}

export interface Highlight {
  id?: number;
  bookId: number;
  cfiRange: string;
  text: string;
  note?: string;
  color: string; // e.g., 'yellow', 'blue'
  created: Date;
}

export interface Bookmark {
  id?: number;
  bookId: number;
  cfi: string;
  name: string;
  created: Date;
}

export interface Note {
  id?: number;
  bookId: number;
  cfiRange: string;
  text: string;
  note: string;
  created: Date;
}

export interface SearchResult {
  cfi: string;
  excerpt: string;
}
