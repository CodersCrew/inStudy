import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ProfileBase } from 'components';
import CardEditModal from './CardEditModal';

@connect(({ auth }) => ({ auth }))
class InitiativePublicProfile extends PureComponent {
  constructor(props) {
    super(props);
    window.disableHomeAnimation = true;
  }

  componentWillUnmount() {
    setTimeout(() => {
      window.disableHomeAnimation = false;
    }, 100);
  }

  render() {
    const { auth, match } = this.props;
    const initiative = auth?.initiatives.find(({ shortUrl }) => shortUrl === match.params.shortUrl);

    if ((auth && !initiative) || auth === false) {
      return <Redirect to="/404" />;
    }

    return (
      auth && (
        <ProfileBase
          editable
          data={initiative}
          accessibleModals={['richText', 'timeline', 'traits', 'numbers', 'accordion', 'people', 'projects', 'logos', 'contact']}
          cardEditModal={CardEditModal}
        />
      )
    );
  }
}

InitiativePublicProfile.propTypes = {
  auth: object,
  match: object.isRequired,
};

InitiativePublicProfile.defaultProps = {
  auth: null,
};

export default InitiativePublicProfile;
