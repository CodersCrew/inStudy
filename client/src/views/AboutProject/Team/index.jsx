import React from 'react';
import data from './data';
import Member from './Member';
import { MainContainer, Heading, TeamList } from './styles';

const Team = () => (
  <MainContainer>
    <Heading>Zespół inStudy</Heading>
    <TeamList>
      {data.map(item => <Member key={item.text} {...item} />)}
    </TeamList>
  </MainContainer>
);

export default Team;
