import RichTextModule from 'components/Modules/RichText';
import RichTextModal from 'components/ModulesModals/RichText';

import SkillsModule from 'components/Modules/Skills';
import SkillsModal from 'components/ModulesModals/Skills';

import TimelineModule from 'components/Modules/Timeline';
import TimelineModal from 'components/ModulesModals/Timeline';

import ContactModule from 'components/Modules/Contact';
import ContactModal from 'components/ModulesModals/Contact';

import TraitsModule from 'components/Modules/Traits';
import TraitsModal from 'components/ModulesModals/Traits';

import NumbersModule from 'components/Modules/Numbers';
import NumbersModal from 'components/ModulesModals/Numbers';

import AccordionModule from 'components/Modules/Accordion';
import AccordionModal from 'components/ModulesModals/Accordion';

import PeopleModule from 'components/Modules/People';
import PeopleModal from 'components/ModulesModals/People';

import ProjectsModule from 'components/Modules/Projects';
import ProjectsModal from 'components/ModulesModals/Projects';

import LogosModule from 'components/Modules/Logos';
import LogosModal from 'components/ModulesModals/Logos';

import VideoModule from 'components/Modules/Video';
import VideoModal from 'components/ModulesModals/Video';

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
  traits: {
    name: 'Cechy',
    iconClass: 'fal fa-list-alt',
    description: 'Lista cech składających się z ikony, tytułu i opisu.',
    module: TraitsModule,
    modalContent: TraitsModal,
  },
  numbers: {
    name: 'Liczby',
    iconClass: 'fal fa-calculator-alt',
    description: 'Liczby opisujące Ciebie i Twoje dokonania.',
    module: NumbersModule,
    modalContent: NumbersModal,
  },
  accordion: {
    name: 'Lista rozwijana',
    iconClass: 'fal fa-bars',
    description: 'Lista składająca się z nagłówków i rozwijanych opisów.',
    module: AccordionModule,
    modalContent: AccordionModal,
  },
  people: {
    name: 'Ludzie',
    iconClass: 'fal fa-user-circle',
    description: 'Kafelki pozwalające zaprezentować i opisać osoby.',
    module: PeopleModule,
    modalContent: PeopleModal,
  },
  projects: {
    name: 'Projekty',
    iconClass: 'fal fa-grip-horizontal',
    description: 'Kafelki pozwalające zaprezentować i opisać projekty.',
    module: ProjectsModule,
    modalContent: ProjectsModal,
  },
  logos: {
    name: 'Loga',
    iconClass: 'fal fa-grip-horizontal',
    description: 'Lista logotypów z linkami do zewnętrznych stron.',
    module: LogosModule,
    modalContent: LogosModal,
  },
  video: {
    name: 'Filmik',
    iconClass: 'fal fa-grip-horizontal',
    description: 'Video wgrane z dowolnego serwisu z filmikami.',
    module: VideoModule,
    modalContent: VideoModal,
  },
  contact: {
    name: 'Formularz kontaktowy',
    iconClass: 'fal fa-phone',
    description: 'Pole umożliwiające kontakt z Tobą bez konieczności ujawniania Twojego maila.',
    module: ContactModule,
    modalContent: ContactModal,
  },
};
