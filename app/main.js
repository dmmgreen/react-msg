import React from 'react';
import ReactDOM from 'react-dom';
import { Router,Route,Link,hashHistory,IndexRoute} from 'react-router';

import Header from './components/header/header';
import LeftBar from './components/leftBar/leftBar';
import List from './components/list/list';
import Tag from './components/tag/tag';
import Question from './components/question/question';

import './public/css/normalize.css';
import './public/scss/index.scss';


class Main extends React.Component{
    render(){
        return (
            <div>
                <Header />
                {
                    this.props.children
                }
                <LeftBar />
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={List} />
            <Route path="/tag/:id" component={Tag} />
            <Route path="/question/:questionId" component={Question} />
        </Route>
    </Router>,
    document.getElementById('app')
);