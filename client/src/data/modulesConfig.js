import RichTextModule from 'components/Modules/RichText';
import RichTextModal from 'components/ModulesModals/RichText';

import SkillsModule from 'components/Modules/Skills';
import SkillsModal from 'components/ModulesModals/Skills';

import TimelineModule from 'components/Modules/Timeline';
import TimelineModal from 'components/ModulesModals/Timeline';

import ContactModule from 'components/Modules/Contact';
import ContactModal from 'components/ModulesModals/Contact';

export default {
  richText: {
    name: 'Tekst',
    iconClass: 'fal fa-font',
    description: 'Pole tekstowe z możliwością dodawania linków, zdjęć i filmików.',
    module: RichTextModule,
    modalContent: RichTextModal,
  },
  skills: {
    name: 'Umiejętności',
    iconClass: 'fal fa-chart-line',
    description: 'Wykresy prezentujące poziom opanowania wybranych umiejętności.',
    module: SkillsModule,
    modalContent: SkillsModal,
  },
  timeline: {
    name: 'Oś czasu',
    iconClass: 'fal fa-history',
    description: 'Zbiór ułożonych hronologicznie wydarzeń.',
    module: TimelineModule,
    modalContent: TimelineModal,
  },
  contact: {
    name: 'Formularz kontaktowy',
    iconClass: 'fal fa-phone',
    description: 'Pola umożliwiające kontakt z Tobą bez konieczności ujawniania Twojego maila.',
    module: ContactModule,
    modalContent: ContactModal,
  },
};
