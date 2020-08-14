import { Model } from '@vuex-orm/core';
import shortid from 'shortid';

export default class Keyframe extends Model {
  static entity = 'keyframes';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => shortid.generate()),
      animationId: this.attr(null),
      offset: this.number(0),
      cssProperties: this.attr(),
    };
  }
}
