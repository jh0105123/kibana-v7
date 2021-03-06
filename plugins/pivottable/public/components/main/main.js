import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

import customData from './data.json';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/pivottable/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }

  render() {
    const { title } = this.props;
    // const data = [['attribute', 'attribute2'], [500, 120]];	  
    const data = customData;

    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>
                <FormattedMessage
                  id="pivottable.helloWorldText"
                  defaultMessage="{title}"
                  values={{ title }}
                />
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            {/* <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="pivottable.congratulationsTitle"
                    defaultMessage="Congratulations"
                  />
                </h2>
              </EuiTitle>
            </EuiPageContentHeader> */}
            <EuiPageContentBody>
              {/* <EuiText>
                <h3>
                  <FormattedMessage
                    id="pivottable.congratulationsText"
                    defaultMessage="You have successfully created your first Kibana Plugin!"
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="pivottable.serverTimeText"
                    defaultMessage="The server time (via API call) is {time}"
                    values={{ time: this.state.time || 'NO API CALL YET' }}
                  />
                </p>
              </EuiText> */}
                  <PivotTableUI
                    data={data}
                    onChange={s => this.setState(s)}
                    {...this.state}/>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
