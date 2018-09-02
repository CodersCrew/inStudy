import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { ProfileBase } from 'components';
import CardEditModal from './CardEditModal';

@connect(({ auth }) => ({ user: auth }))
class UserProfile extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      user && (
        <ProfileBase
          editable
          data={{
            ...user,
            name: `${user.firstName} ${user.lastName}`,
          }}
          accessibleModals={['richText', 'skills', 'timeline', 'contact']}
          cardEditModal={CardEditModal}
        />
      )
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
