import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getInitiativePublicProfile, cleanPublicProfile } from 'store/actions/publicProfile';
import { ProfileBase } from 'components';

@connect(
  ({ publicProfile }) => ({ initiative: publicProfile }),
  { getInitiativePublicProfile, cleanPublicProfile },
)
class InitiativePublicProfile extends PureComponent {
  constructor(props) {
    super(props);
    window.disableHomeAnimation = true;
  }

  componentDidMount() {
    this.props.getInitiativePublicProfile(this.props.match.params.shortUrl);
  }

  componentWillUnmount() {
    setTimeout(() => {
      window.disableHomeAnimation = false;
    }, 100);
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