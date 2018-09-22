import React from 'react';
import { string, func } from 'prop-types';
import { Button } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import data from './data';
import Priority from './Priority';
import { MainContainer, Heading, PrioritiesList } from './styles';

const ButtonGroup = Button.Group;

const withHocs = compose(
  withState('activeItem', 'setActiveItem', 'initiative'),
  withHandlers({
    setActiveItem: ({ setActiveItem }) => itemName => setActiveItem(() => itemName),
  }),
);

const Priorities = ({ activeItem, setActiveItem }) => (
  <MainContainer>
    <Heading>Nasze priorytety</Heading>
    <ButtonGroup>
      <Button
        type={activeItem === 'initiative' ? 'primary' : 'default'}
        onClick={() => setActiveItem('initiative')}
      >
        dla inicjatyw
      </Button>
      <Button
        type={activeItem === 'student' ? 'primary' : 'default'}
        onClick={() => setActiveItem('student')}
      >
        dla studentów
      </Button>
    </ButtonGroup>
    <PrioritiesList>
      {data[activeItem].map(item => <Priority key={item.title} {...item} />)}
    </PrioritiesList>
  </MainContainer>
);

Priorities.propTypes = {
  activeItem: string.isRequired,
  setActiveItem: func.isRequired,
};

export default withHocs(Priorities);
