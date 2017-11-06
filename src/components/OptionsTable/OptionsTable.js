import React from 'react';
import Agent from '@meldcx/agent';

import {Loader, Icon} from 'components';

export default class OptionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {},
            sortBy: 'key',
            sortReverse: false
        };
        this.setup();
    }

    async setup() {
        this.agent = new Agent();
        await this.agent.onReadyAsync();
        this.setState({
            options: await this.agent.Device.getOptions()
        });
    }

    render() {
        let {contents} = this;
        if (!contents) contents = <tr>
            <td colSpan="2" className="po-r">
                <Loader />
            </td>
        </tr>;

        return <table>
            <tbody>
                {this.header}
                {contents}
            </tbody>
        </table>;
    }

    get sortBy() { return this.state.sortBy; }
    set sortBy(v) { return this.setState({sortBy: v}); }

    get sortReverse() { return this.state.sortReverse; }
    set sortReverse(v) { return this.setState({sortReverse: v}); }

    get headings() { return ['key', 'value']; }

    get header() {

        return <tr>
            {this.headings.map(h =>
                <th onClick={() => this.sort(h)} key={h}>
                    <span>{h}</span>
                    {this.sortBy === h &&
                        <Icon type={`arrow-short-${this.sortReverse ? 'up' : 'down'}`} />
                    }
                </th>
            )}
        </tr>;
    }


    get contents() {
        if (!this.sortBy) return null;
        const entries = Object.entries(this.state.options);
        const keyIndex = this.headings.indexOf(this.sortBy);

        if (entries.length) {
            let sorted = entries.sort((a, b) => {
                const v1 = a[keyIndex];
                const v2 = b[keyIndex];
                if (v1 < v2) return -1;
                if (v1 > v2) return 1;
                if (v1 == v2) return 0;
            });

            sorted = this.sortReverse ? sorted.reverse() : sorted;

            return sorted
                .map(([key, value]) =>
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                );

        } else return null;
    }


    sort(heading) {
        const h = heading;
        if (this.sortBy === h) this.sortReverse = !this.sortReverse;
        else {
            this.sortBy = h;
            this.sortReverse = false;
        }
    }
}
