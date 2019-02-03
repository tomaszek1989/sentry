import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import AsyncView from 'app/views/asyncView';
import {Panel, PanelBody, PanelHeader} from 'app/components/panels';
import withOrganization from 'app/utils/withOrganization';
import SentryTypes from 'app/sentryTypes';
import {t} from 'app/locale';

import MonitorCheckIns from './monitorCheckIns';
import MonitorHeader from './monitorHeader';
import MonitorIssues from './monitorIssues';
import MonitorStats from './monitorStats';

class OrganizationMonitorDetails extends AsyncView {
  static contextTypes = {
    organization: SentryTypes.Organization,
    location: PropTypes.object.isRequired,
  };

  getEndpoints() {
    let {params, location} = this.props;
    return [
      [
        'monitor',
        `/monitors/${params.monitorId}/`,
        {
          query: location.query,
        },
      ],
    ];
  }

  getTitle() {
    if (this.state.monitor)
      return `${this.state.monitor.name} - Monitors - ${this.props.params.orgId}`;
    return `Monitors - ${this.props.params.orgId}`;
  }

  renderBody() {
    let {monitor} = this.state;
    return (
      <React.Fragment>
        <MonitorHeader monitor={monitor} />

        <MonitorStats monitor={monitor} />

        <Panel>
          <PanelHeader>{t('Related Issues')}</PanelHeader>

          <PanelBody>
            <MonitorIssues monitor={monitor} orgId={this.props.params.orgId} />
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader>{t('Recent Check-ins')}</PanelHeader>

          <MonitorCheckIns monitor={monitor} />
        </Panel>
      </React.Fragment>
    );
  }
}

export default withRouter(withOrganization(OrganizationMonitorDetails));
