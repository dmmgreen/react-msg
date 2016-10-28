import React from 'react';
import { IndexLink} from 'react-router';


export default class Back extends React.Component {
    render() {
        return (
            <div id="back">
                <a href="javascript:history.go(-1);" ></a>
            </div>
        )
    }
}

