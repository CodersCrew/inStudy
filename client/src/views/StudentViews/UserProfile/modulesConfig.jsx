import RichTextModule from './Modules/RichText';
import RichTextModal from './ModulesModals/RichText';
import RichTextValidation from './ModulesModals/RichText/validate';

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
    description: 'Pole tekstowe z możliwością dodawania linków, zdjęć i filmików.',
    module: RichTextModule,
    modalContent: RichTextModal,
    validate: RichTextValidation,
  },
  skills: {
    name: 'Umiejętności',
    icon: 'chart-line',
    description: 'Wykresy prezentujące poziom opanowania wybranych umiejętności.',
    module: SkillsModule,
    modalContent: SkillsModal,
  },
  timeline: {
    name: 'Oś czasu',
    icon: 'history',
    description: 'Zbiór ułożonych hronologicznie wydarzeń.',
    module: TimelineModule,
    modalContent: TimelineModal,
  },
  contact: {
    name: 'Formularz kontaktowy',
    icon: 'phone',
    description: 'Pola umożliwiające kontakt z Tobą bez konieczności ujawniania Twojego maila.',
    module: ContactModule,
    modalContent: ContactModal,
  },
};
