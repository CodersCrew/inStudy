import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import TriangleBackground from 'components/TriangleBackground';
import Card from './Card';
import Modules from './Modules';
import { MainContainer, LeftColumn, RightColumn } from './styles';

@connect(({ auth }) => ({ user: auth }))
class UserProfile extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Fragment>
        <MainContainer>
          <LeftColumn>
            <Card />
          </LeftColumn>
          <RightColumn>
            <Modules />
          </RightColumn>
        </MainContainer>
        <TriangleBackground />
      </Fragment>
    );
  }
}

UserProfile.propTypes = {
  auth: object,
};

UserProfile.defaultProps = {
  auth: null,
};

export default UserProfile;
