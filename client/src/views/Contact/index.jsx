import React from 'react';
import { Tooltip } from 'react-tippy';
import { socials } from 'data';
import { Container, Middlebox, Header, Row, Socials, Social } from './styles';

const { facebook, gitHub, website } = socials;

const Contact = () => (
  <Container>
    <Middlebox>
      <Header>Skontaktuj się z nami</Header>
      <Row>
        <i className="fal fa-envelope" />
        <a href="mailto:kontakt@coderscrew.pl">kontakt@coderscrew.pl</a>
      </Row>
      <Row>
        <i className="fal fa-phone" />
        <a href="tel:+48601545105">+48 601 545 105</a>
      </Row>
      <Socials>
        <Tooltip title="Fanpage projektu">
          <Social color={facebook.color} href="https://www.facebook.com/pl.instudy">
            <i className={facebook.icon} />
          </Social>
        </Tooltip>
        <Tooltip title="Fanpage twórców">
          <Social color={facebook.color} href="https://www.facebook.com/ccrew18">
            <i className={facebook.icon} />
          </Social>
        </Tooltip>
        <Tooltip title="Repozytorium projektu" href="https://github.com/CodersCrew/inStudy">
          <Social color={gitHub.color}>
            <i className={gitHub.icon} />
          </Social>
        </Tooltip>
        <Tooltip title="Strona CodersCrew" href="https://coderscrew.pl">
          <Social color={website.color}>
            <i className={website.icon} />
          </Social>
        </Tooltip>
      </Socials>
    </Middlebox>
  </Container>
);

export default Contact;
