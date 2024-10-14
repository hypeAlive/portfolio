export class Key {

  constructor(private _key: string, private _id: number) {}

  public get id(): number {
    return this._id;
  }

  public get key(): string {
    return this._key;
  }
}

export type KeyEvent = {
  key: Key;
  pressedViaMouse: boolean;
}

const KEYS = {
  ENTER: new Key('Enter', 36),
  SPACE: new Key(' ', 1),
  ALT: new Key('Alt', 2),
  ALT_GR: new Key('AltGraph', 3),
  CAPS: new Key('CapsLock', 4),
  WIN: new Key('Meta', 5),
  STRG_LEFT: new Key('Command', 6),
  TAB: new Key('Tab', 7),
  BACK: new Key('Backspace', 8),
  Q: new Key('q', 2),
  W: new Key('w', 3),
  E: new Key('e', 4),
  R: new Key('r', 5),
  T: new Key('t', 6),
  Z: new Key('z', 7),
  U: new Key('u', 8),
  I: new Key('i', 9),
  O: new Key('o', 10),
  P: new Key('p', 11),
  A: new Key('a', 12),
  S: new Key('s', 13),
  D: new Key('d', 14),
  F: new Key('f', 15),
  G: new Key('g', 16),
  H: new Key('h', 17),
  J: new Key('j', 18),
  K: new Key('k', 19),
  L: new Key('l', 20),
  OE: new Key('ö', 21),
  AE: new Key('ä', 22),
  HASHTAG: new Key('#', 23),
  Y: new Key('y', 24),
  X: new Key('x', 25),
  C: new Key('c', 26),
  V: new Key('v', 27),
  B: new Key('b', 28),
  N: new Key('n', 29),
  M: new Key('m', 30),
  COMMA: new Key(',', 31),
  DOT: new Key('.', 32),
  MINUS: new Key('-', 33),
}

export class KeyHelper {

  static getKey(event: KeyboardEvent): Key | undefined {
    return Object.values(KEYS).find((key) => key.key.toLowerCase() === event.key.toLowerCase());
  }

  static getAllKeys(): Key[] {
    return Object.values(KEYS);
  }

  static getKeyById(id: number): Key | undefined {
    return Object.values(KEYS).find((key) => key.id === id);
  }

}
