import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withCustomColor, withAuth } from 'hocs';
import { ProfileBase } from 'components';
import CardEditModal from './CardEditModal';

@withAuth('initiativeProfile')
@connect(({ auth }) => ({ auth }))
@withCustomColor
class InitiativePublicProfile extends PureComponent {
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
