import React from 'react';
import { string, arrayOf, exact, oneOfType, number } from 'prop-types';
import { Container, Skill, SkillName, SkillBar, Bar, StyledTooltip } from './styles';

const renderSkill = skill => (
  <Skill>
    <SkillName>{skill.name}</SkillName>
    <SkillBar>
      <StyledTooltip
        width={skill.value}
        title={skill.value}
        arrow
        position="top-end"
        size="small"
        arrowSize="small"
        offset={13}
        delay={100}
      >
        <Bar />
      </StyledTooltip>
    </SkillBar>
  </Skill>
);

const Skills = ({ items }) => (
  <Container>
    {items.filter(({ name }) => name).map(renderSkill)}
  </Container>
);

Skills.propTypes = {
  items: arrayOf(exact({
    name: string,
    value: oneOfType([string, number]),
  })),
};

Skills.defaultProps = {
  items: [],
};

export default Skills;
