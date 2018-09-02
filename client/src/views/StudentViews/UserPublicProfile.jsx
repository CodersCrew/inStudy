import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
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

    return <ProfileBase data={this.props.user} />;
  }
}

UserProfile.propTypes = {
  user: object,
};

UserProfile.defaultProps = {
  user: null,
};

export default UserProfile;
