import React from 'react';
import {withRouter} from 'react-router';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import {getParams} from 'app/views/organizationEvents/utils/getParams';
import Feature from 'app/components/acl/feature';
import GlobalSelectionHeader from 'app/components/organizations/globalSelectionHeader';
import {PageContent} from 'app/styles/organization';
import withGlobalSelection from 'app/utils/withGlobalSelection';
import withOrganization from 'app/utils/withOrganization';

import SentryTypes from 'app/sentryTypes';

const Body = styled('div')`
  background-color: ${p => p.theme.whiteDark};
  flex-direction: column;
  flex: 1;
`;

class OrganizationMonitorsContainer extends React.Component {
  static propTypes = {
    organization: SentryTypes.Organization,
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSearch = query => {
    let {router, location} = this.props;
    router.push({
      pathname: location.pathname,
      query: getParams({
        ...(location.query || {}),
        query,
      }),
    });
  };

  render() {
    const {organization, children} = this.props;

    return (
      <Feature features={['monitors']} renderDisabled>
        <GlobalSelectionHeader
          organization={organization}
          showEnvironmentSelector={false}
          showDateSelector={false}
          resetParamsOnChange={['cursor']}
        />
        <PageContent>
          <Body>{children}</Body>
        </PageContent>
      </Feature>
    );
  }
}

export default withRouter(
  withOrganization(withGlobalSelection(OrganizationMonitorsContainer))
);
export {OrganizationMonitorsContainer};
