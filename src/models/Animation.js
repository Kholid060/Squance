import { Model } from '@vuex-orm/core';
import shortid from 'shortid';
import Keyframe from './Keyframe';
import Property from './Property';

export default class Animation extends Model {
  static entity = 'animations';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => shortid.generate()),
      fileId: this.attr(null),
      target: this.string(''),
      name: this.string(''),
      active: this.boolean(false),
      keyframes: this.hasMany(Keyframe, 'animationId'),
      properties: this.hasOne(Property, 'animationId'),
    };
  }
}
