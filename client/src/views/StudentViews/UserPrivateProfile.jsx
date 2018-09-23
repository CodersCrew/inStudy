import React from 'react';
import { object } from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withCustomColor } from 'hocs';
import { ProfileBase } from 'components';
import CardEditModal from './CardEditModal';

const hocs = compose(
  connect(({ auth }) => ({ user: auth })),
  withCustomColor,
);

const UserProfile = ({ user }) => user && (
  <ProfileBase
    editable
    data={{
      ...user,
      name: `${user.firstName} ${user.lastName}`,
    }}
    accessibleModals={['richText', 'skills', 'timeline', 'traits', 'numbers', 'accordion', 'people', 'projects', 'logos', 'contact']}
    cardEditModal={CardEditModal}
  />
);

UserProfile.propTypes = {
  user: object,
};

UserProfile.defaultProps = {
  user: null,
};

export default hocs(UserProfile);
