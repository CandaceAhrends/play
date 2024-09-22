export const sortByVolume = (a, b) => {
  const avol = a.volume;
  const bvol = b.volume;
  if (avol < bvol) {
    return 1;
  } else if (avol > bvol) {
    return -1;
  }
  return 0;
};

/*
  Iterate an arr like a wheel and stop when the predicate fn returns true or when the wheel spins to exceed the len of the arr
*/
export class WheelSpinner {
  static FWD = 'fwd';
  static BCK = 'bck';
  constructor(wheel) {
    if (!Array.isArray(wheel)) {
      throw new Error('wheel must be an array');
    }
    this.predicateFn = () => {
      return false;
    };
    this.wheelLength = wheel.length;
    this.currentPosition = 0;
    this.counter = 0;
  }
  #setCurrentPosition(nextIncrement) {
    this.currentPosition = nextIncrement % this.wheelLength;
    this.counter++;
  }
  getExceededWheelCircum() {
    return this.wheelLength < this.counter;
  }
  getTotalSpins() {
    return this.counter;
  }
  setCurrentPosition(position) {
    this.currentPosition = position;
  }
  resetPosition() {
    this.currentPosition = 0;
  }
  getCurrentPosition() {
    return this.currentPosition;
  }
  spinForward() {
    this.#setCurrentPosition(this.currentPosition + 1);
    return this.currentPosition;
  }
  spinBack() {
    const next = this.currentPosition - 1 + this.wheelLength;
    this.#setCurrentPosition(next);
    return this.currentPosition;
  }
  setSpinPredicate(fn) {
    this.predicateFn = fn;
  }
  spin(direction) {
    direction === WheelSpinner.FWD ? this.spinForward() : this.spinBack();
    if (this.getExceededWheelCircum()) {
      throw new Error('Error spinning wheel');
    }
    if (this.predicateFn(this.currentPosition)) {
      return this.getTotalSpins();
    }
    return this.spin(direction);
  }
}
