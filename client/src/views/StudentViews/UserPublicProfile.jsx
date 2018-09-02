import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getUserPublicProfile, cleanPublicProfile } from 'store/actions/publicProfile';
import { ProfileBase } from 'components';

@connect(
  ({ publicProfile }) => ({ user: publicProfile }),
  { getUserPublicProfile, cleanPublicProfile },
)
class UserProfile extends PureComponent {
  componentDidMount() {
    this.props.getUserPublicProfile(this.props.match.params.userId);
  }

  componentWillUnmount() {
    this.props.cleanPublicProfile();
  }

  render() {
    const { user } = this.props;

    if (user === false) {
      return <Redirect to="/404" />;
    }

    return (
      <ProfileBase
        data={{
          ...user,
          name: `${user.firstName} ${user.lastName}`,
        }}
      />
    );
  }
}

UserProfile.propTypes = {
  user: object,
  getUserPublicProfile: func,
  cleanPublicProfile: func,
  match: object.isRequired,
};

UserProfile.defaultProps = {
  user: null,
  getUserPublicProfile: () => {},
  cleanPublicProfile: () => {},
};

export default UserProfile;
