export default class Dice {

  constructor(options = '') {
    this.sides = options.sides || 6;
    this.color = options.color || '#f1f1f1';
    this.currentValue = options.currentValue || this.getRandomInt(1, this.sides);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
