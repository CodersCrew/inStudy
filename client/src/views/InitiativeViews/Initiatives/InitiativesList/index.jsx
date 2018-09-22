import React, { Fragment } from 'react';
import { array, func, number } from 'prop-types';
import Card from '../Card';
import { StyledContainer } from './styles';

const InitiativesList = ({ initiatives, waypoint, handleCardClick, clickedCardIndex }) => (
  <StyledContainer>
    {initiatives.map((initiative, i) => (
      <Fragment key={initiative.shortUrl}>
        {i === initiatives.length - 3 && waypoint()}
        <Card
          key={initiative.shortUrl}
          clicked={i === clickedCardIndex}
          onClick={() => handleCardClick(i)}
          {...initiative}
        />
      </Fragment>
    ))}
  </StyledContainer>
);

InitiativesList.propTypes = {
  initiatives: array.isRequired,
  waypoint: func.isRequired,
  handleCardClick: func.isRequired,
  clickedCardIndex: number,
};

InitiativesList.defaultProps = {
  clickedCardIndex: null,
};

export default InitiativesList;
