import React from 'react';

import {OptionsTable} from 'components';

export default class App extends React.Component {
    render() {
        return <div className="wrapper">
            <h1 className="m-v-large">Sortable device options</h1>
            <OptionsTable />
        </div>;
    }
}
