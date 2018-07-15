import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import Card from '../Card';
import { StyledContainer } from './styles';

class InitiativesList extends PureComponent {
  render() {
    console.log(this.props.initiatives);
    return (
      <StyledContainer>
        {this.props.initiatives.map(initiative => (
          <Card key={initiative.shortUrl} {...initiative} />
        ))}
      </StyledContainer>
    );
  }
}

InitiativesList.propTypes = {
  text: string,
};

InitiativesList.defaultProps = {
  text: 'Hello World',
};

export default InitiativesList;
