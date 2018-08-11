import React from 'react';

import RichTextModule from './Modules/RichText';
import RichTextModal from './ModulesModals/RichText';

const SkillsModule = () => <div>Moduł umiejętności</div>;
const SkillsModal = () => <div>Modal umiejętności</div>;

const TimelineModule = () => <div>Moduł oś czasu</div>;
const TimelineModal = () => <div>Modal oś czasu</div>;

import ContactModule from './Modules/Contact';
import ContactModal from './ModulesModals/Contact';

export default {
  richText: {
    name: 'Tekst',
    icon: 'font',
    module: RichTextModule,
    modal: RichTextModal,
  },
  skills: {
    name: 'Umiejętności',
    icon: 'chart-line',
    module: SkillsModule,
    modal: SkillsModal,
  },
  timeline: {
    name: 'Oś czasu',
    icon: 'history',
    module: TimelineModule,
    modal: TimelineModal,
  },
  contact: {
    name: 'Formularz kontaktowy',
    icon: 'phone',
    module: ContactModule,
    modal: ContactModal,
  },
};
