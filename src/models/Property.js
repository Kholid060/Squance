import { Model } from '@vuex-orm/core';
import shortid from 'shortid';

export default class Property extends Model {
  static entity = 'Properties';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => shortid.generate()),
      duration: this.number(4000),
      iterations: this.attr(Infinity),
      easing: this.string('ease'),
      direction: this.string('normal'),
      fill: this.string('none'),
      animationId: this.attr(null),
    };
  }
}
