import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import AsyncComponent from 'app/components/asyncComponent';
import {Panel, PanelBody} from 'app/components/panels';
import {t} from 'app/locale';
import EmptyMessage from 'app/views/settings/components/emptyMessage';
import StackedBarChart from 'app/components/stackedBarChart';
import TextBlock from 'app/views/settings/components/text/textBlock';

export default class MonitorStats extends AsyncComponent {
  static propTypes = {
    monitor: PropTypes.object.isRequired,
    ...AsyncComponent.PropTypes,
  };

  getDefaultState() {
    let until = Math.floor(new Date().getTime() / 1000);
    let since = until - 3600 * 24 * 30;

    return {
      since,
      until,
    };
  }

  getEndpoints() {
    let {monitor} = this.props;
    return [
      [
        'stats',
        `/monitors/${monitor.id}/stats/`,
        {
          query: {
            since: this.state.since,
            until: this.state.until,
            resolution: '1d',
          },
        },
      ],
    ];
  }

  renderTooltip(point, pointIdx, chart) {
    let timeLabel = chart.getTimeLabel(point);
    let [error, ok] = point.y;

    let value = `${ok.toLocaleString()} successful<br>${error.toLocaleString()} failed`;

    return (
      '<div style="width:150px">' +
      `<div class="time-label">${timeLabel}</div>` +
      `<div class="value-label">${value}</div>` +
      '</div>'
    );
  }

  renderBody() {
    let emptyStats = true;
    let stats = this.state.stats.map(p => {
      if (p.ok || p.error) emptyStats = false;
      return {
        x: p.ts,
        y: [p.error, p.ok],
      };
    });

    return (
      <Panel>
        <PanelBody>
          {!emptyStats ? (
            <StackedBarChart
              points={stats}
              height={150}
              label="events"
              barClasses={['error', 'success']}
              className="standard-barchart"
              style={{border: 'none'}}
              tooltip={this.renderTooltip}
            />
          ) : (
            <EmptyMessage css={{flexDirection: 'column', alignItems: 'center'}}>
              <EmptyHeader>{t('Nothing recorded in the last 30 days.')}</EmptyHeader>
              <TextBlock css={{marginBottom: 0}}>
                {t('All check-ins for this monitor.')}
              </TextBlock>
            </EmptyMessage>
          )}
        </PanelBody>
      </Panel>
    );
  }
}

const EmptyHeader = styled.div`
  font-size: 1.3em;
`;
