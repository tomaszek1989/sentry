import React from 'react';
import {Link, withRouter} from 'react-router';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {Box} from 'grid-emotion';

import AsyncView from 'app/views/asyncView';
import BetaTag from 'app/components/betaTag';
import {Panel, PanelBody, PanelItem} from 'app/components/panels';
import {PageHeader} from 'app/styles/organization';
import PageHeading from 'app/components/pageHeading';
import TimeSince from 'app/components/timeSince';
import Pagination from 'app/components/pagination';
import SentryTypes from 'app/sentryTypes';
import SearchBar from 'app/components/searchBar';
import withOrganization from 'app/utils/withOrganization';
import {t} from 'app/locale';

import MonitorIcon from './monitorIcon';

const HeaderTitle = styled(PageHeading)`
  flex: 1;
`;

const StyledSearchBar = styled(SearchBar)`
  flex: 1;
`;

class OrganizationMonitors extends AsyncView {
  static contextTypes = {
    organization: SentryTypes.Organization,
    location: PropTypes.object.isRequired,
  };

  getEndpoints() {
    let {params, location} = this.props;
    return [
      [
        'monitorList',
        `/organizations/${params.orgId}/monitors/`,
        {
          query: location.query,
        },
      ],
    ];
  }

  getTitle() {
    return `Monitors - ${this.props.params.orgId}`;
  }

  renderBody() {
    let {monitorListPageLinks} = this.state;
    let {organization} = this.props;
    return (
      <React.Fragment>
        <PageHeader>
          <HeaderTitle>
            {t('Monitors')} <BetaTag />
          </HeaderTitle>
          <StyledSearchBar
            organization={organization}
            query={(location.query && location.query.query) || ''}
            placeholder={t('Search for monitors.')}
            onSearch={this.handleSearch}
          />
        </PageHeader>
        <Panel>
          <PanelBody>
            {this.state.monitorList.map(monitor => {
              return (
                <PanelItem key={monitor.id}>
                  <Box style={{width: 16}} align="center" justify="center" mr={2}>
                    <MonitorIcon
                      status={monitor.status}
                      lastCheckIn={monitor.lastCheckIn}
                      size={16}
                    />
                  </Box>
                  <Box flex="1" mr={2}>
                    <Link
                      to={`/organizations/${organization.slug}/monitors/${monitor.id}/`}
                    >
                      {monitor.name}
                    </Link>
                  </Box>
                  <Box>
                    {monitor.nextCheckIn ? (
                      <TimeSince date={monitor.lastCheckIn} />
                    ) : (
                      'n/a'
                    )}
                  </Box>
                </PanelItem>
              );
            })}
          </PanelBody>
        </Panel>
        {monitorListPageLinks && (
          <Pagination pageLinks={monitorListPageLinks} {...this.props} />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(withOrganization(OrganizationMonitors));
