import { Model } from '@vuex-orm/core';
import shortid from 'shortid';
import Animation from './Animation';

export default class File extends Model {
  static entity = 'files';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => shortid.generate()),
      name: this.attr(''),
      duration: this.number(0),
      createdAt: this.attr(Date.now()),
      html: this.string(''),
      css: this.string(''),
      animations: this.hasMany(Animation, 'fileId', 'id'),
    };
  }
}
