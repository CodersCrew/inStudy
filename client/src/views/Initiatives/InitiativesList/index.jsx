import React, { Fragment } from 'react';
import { array } from 'prop-types';
import Card from '../Card';
import { StyledContainer } from './styles';

const InitiativesList = ({ initiatives, waypoint }) => (
  <StyledContainer>
    {initiatives.map((initiative, i) => (
      <Fragment key={initiative.shortUrl}>
        {i === initiatives.length - 3 && waypoint()}
        <Card key={initiative.shortUrl} {...initiative} />
      </Fragment>
    ))}
  </StyledContainer>
);

InitiativesList.propTypes = {
  initiatives: array.isRequired,
};

export default InitiativesList;
