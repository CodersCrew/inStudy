import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import TriangleBackground from 'components/TriangleBackground';
import { Container } from './styles';

@connect(({ auth }) => ({ user: auth }))
class UserProfile extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Container>
        <TriangleBackground />
        {this.props.text}
      </Container>
    );
  }
}

UserProfile.propTypes = {
  text: string,
};

UserProfile.defaultProps = {
  text: 'Hello World',
};

export default UserProfile;
