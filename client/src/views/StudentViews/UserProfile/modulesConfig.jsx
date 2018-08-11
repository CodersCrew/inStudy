import RichTextModule from './Modules/RichText';
import RichTextModal from './ModulesModals/RichText';

import SkillsModule from './Modules/Skills';
import SkillsModal from './ModulesModals/Skills';

import TimelineModule from './Modules/Timeline';
import TimelineModal from './ModulesModals/Timeline';

import ContactModule from './Modules/Contact';
import ContactModal from './ModulesModals/Contact';

export default {
  richText: {
    name: 'Tekst',
    icon: 'font',
    module: RichTextModule,
    modalContent: RichTextModal,
  },
  skills: {
    name: 'Umiejętności',
    icon: 'chart-line',
    module: SkillsModule,
    modalContent: SkillsModal,
  },
  timeline: {
    name: 'Oś czasu',
    icon: 'history',
    module: TimelineModule,
    modalContent: TimelineModal,
  },
  contact: {
    name: 'Formularz kontaktowy',
    icon: 'phone',
    module: ContactModule,
    modalContent: ContactModal,
  },
};
