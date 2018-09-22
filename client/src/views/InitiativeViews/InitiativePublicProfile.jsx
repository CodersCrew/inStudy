import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withCustomColor } from 'hocs';
import { getInitiativePublicProfile, cleanPublicProfile } from 'store/actions/publicProfile';
import { ProfileBase } from 'components';

@connect(
  ({ publicProfile }) => ({ initiative: publicProfile }),
  { getInitiativePublicProfile, cleanPublicProfile },
)
@withCustomColor
class InitiativePublicProfile extends PureComponent {
  componentDidMount() {
    this.props.getInitiativePublicProfile(this.props.match.params.shortUrl);
  }

  componentWillUnmount() {
    this.props.cleanPublicProfile();
  }

  render() {
    const { initiative } = this.props;

    if (initiative === false) {
      return <Redirect to="/404" />;
    }

    return <ProfileBase data={this.props.initiative} />;
  }
}

InitiativePublicProfile.propTypes = {
  initiative: object,
  getInitiativePublicProfile: func,
  cleanPublicProfile: func,
  match: object.isRequired,
};

InitiativePublicProfile.defaultProps = {
  initiative: null,
  getInitiativePublicProfile: () => {},
  cleanPublicProfile: () => {},
};

export default InitiativePublicProfile;
