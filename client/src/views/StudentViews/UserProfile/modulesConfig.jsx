import RichTextModule from './Modules/RichText';
import RichTextModal from './ModulesModals/RichText';
import RichTextConfig from './ModulesModals/RichText/formConfig';

import SkillsModule from './Modules/Skills';
import SkillsModal from './ModulesModals/Skills';
import SkillsConfig from './ModulesModals/Skills/formConfig';

import TimelineModule from './Modules/Timeline';
import TimelineModal from './ModulesModals/Timeline';
import TimelineConfig from './ModulesModals/Timeline/formConfig';

import ContactModule from './Modules/Contact';
import ContactModal from './ModulesModals/Contact';
import ContactConfig from './ModulesModals/Contact/formConfig';

export default {
  richText: {
    name: 'Tekst',
    icon: 'font',
    description: 'Pole tekstowe z możliwością dodawania linków, zdjęć i filmików.',
    module: RichTextModule,
    modalContent: RichTextModal,
    fieldsConfig: RichTextConfig,
  },
  skills: {
    name: 'Umiejętności',
    icon: 'chart-line',
    description: 'Wykresy prezentujące poziom opanowania wybranych umiejętności.',
    module: SkillsModule,
    modalContent: SkillsModal,
    fieldsConfig: SkillsConfig,
  },
  timeline: {
    name: 'Oś czasu',
    icon: 'history',
    description: 'Zbiór ułożonych hronologicznie wydarzeń.',
    module: TimelineModule,
    modalContent: TimelineModal,
    fieldsConfig: TimelineConfig,
  },
  contact: {
    name: 'Formularz kontaktowy',
    icon: 'phone',
    description: 'Pola umożliwiające kontakt z Tobą bez konieczności ujawniania Twojego maila.',
    module: ContactModule,
    modalContent: ContactModal,
    fieldsConfig: ContactConfig,
  },
};
