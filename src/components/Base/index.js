import BaseButton from './BaseButton.vue';
import BaseCard from './BaseCard.vue';
import BaseInput from './BaseInput.vue';
import BaseList from './BaseList.vue';
import BaseModal from './BaseModal.vue';
import BasePopover from './BasePopover.vue';
import BaseTextarea from './BaseTextarea.vue';

export default function (app) {
  app.component(BaseButton.name, BaseButton);
  app.component(BaseCard.name, BaseCard);
  app.component(BaseInput.name, BaseInput);
  app.component(BaseList.name, BaseList);
  app.component(BaseModal.name, BaseModal);
  app.component(BasePopover.name, BasePopover);
  app.component(BaseTextarea.name, BaseTextarea);
}
