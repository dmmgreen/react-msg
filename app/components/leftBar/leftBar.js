import React from 'react';
import ReactDOM from 'react-dom';
import {Link,IndexLink} from 'react-router';

var leftBarConfig=["javascript", "php", "python", "java",
    "mysql", "ios", "android", "node.js", "react.js",
    "html5", "linux", "css3", "git", "golang", "ruby", "vim"
];


export default class LeftBar extends React.Component{
    constructor(){
        super();
        this.state={
            leftConfig:leftBarConfig
        }
    }
    render(){
        var _list=this.state.leftConfig.map(function(item,index){
           return (
               <li key={index}>
                   <Link  to={`/tag/${item}`}>
                       {item}
                   </Link>
               </li>
           );
        });
        return (
            <aside className="leftBar">
                <ul>
                    <li>
                        <IndexLink to="/" >首页</IndexLink>
                    </li>
                    {_list}
                </ul>
            </aside>
        );
    }
}