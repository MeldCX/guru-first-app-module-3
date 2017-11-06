import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from '@meldcx/glow-icons';

export default class Icon extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.string
    }
    static defaultProps = {
        color: 'shade-4',
        size: 'small'
    }
    render() {
        const {
            type,
            color,
            size
        } = this.props;

        const classes = {
            [`c-${color}`]: true,
            [`i-${type}`]: true,
            [`s-${size}`]: true,
            i: true
        };

        return <svg className={classnames(classes)}>
            <use xlinkHref={`${icons}#${type}`} />
        </svg>;
    }
}
