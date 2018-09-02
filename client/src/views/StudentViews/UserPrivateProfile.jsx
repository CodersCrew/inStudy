import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { ProfileBase } from 'components';

@connect(({ auth }) => ({ user: auth }))
class UserProfile extends PureComponent {
  render() {
    return (
      <ProfileBase editable data={this.props.user} accessibleModals={['richText', 'skills', 'timeline', 'contact']} />
    );
  }
}

UserProfile.propTypes = {
  user: object,
};

UserProfile.defaultProps = {
  user: null,
};

export default UserProfile;
