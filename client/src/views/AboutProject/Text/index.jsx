import React from 'react';
import { Container } from 'components';
import { Heading, Texts, Paragraph } from './styles';

const Text = () => (
  <Container>
    <Heading>Dlaczego stworzyliśmy inStudy?</Heading>
    <Texts>
      <Paragraph>
          W dzisiejszych czasach same studia już nie wystarczą. Coraz więcej studentów zauważa, że studiowanie to
          tylko jeden z elementów ich ścieżki kariery. Jeśli na prawdę pragniemy rozwijać swoje pasje i pozwolić odnaleźć się
          wymarzonej pracy musimy dać z siebie znacznie więcej - stworzyć coś, co wyróżni nas spośród setek osób, z którymi studiujemy.
      </Paragraph>
      <Paragraph>
          W tym miejscu go gry wchodzą inicjatywy studenckie - setki kół naukowych, organizacji oraz stowarzyszeń, zrzeszających
          studentów o podobnych zainteresowaniach. Inicjatywy dają nam szansę sprawdzenia się w różnych dziedzinach, poznania ludzi
          podzielających nasze pasje oraz zrealizowania niezapomnianych projektów stanowiących unikalny wpis w CV.
      </Paragraph>
      <Paragraph>
          Tworząc inStudy pragniemy zebrać w jednym miejscu wszystkie wrocławskie inicjatywy studenckie, umożliwiając każdemu
          odnalezienie tych, które najbardziej odpowiadają jego zainteresowaniom. Chcemy, aby dzięki temu aktywność studencka mogła
          rozwijać się jeszcze dynamiczniej, niż ma to miejsce obecnie i aby każdy student był w stanie stworzyć w trakcie studiów
          coś, co na zawsze zapadnie mu w pamięci.
      </Paragraph>
    </Texts>
  </Container>
);

export default Text;
