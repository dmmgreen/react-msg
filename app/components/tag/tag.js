import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';


export default class Tag extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            quelist:[],
            loading:true,
            tag:"",
            loadingMore:false,
            mounted:true
        }
    }
    componentDidMount(){
        this.state.mounted = true;
        var page=this.state.page;
        var tag=this.props.params.id;
        this.updateState(page,tag);
        window.addEventListener('scroll',()=>{this.tagScrollUpdate()});
    }

    componentDidUpdate(prevProps){
        this.state.mounted = true;
        var tag=this.props.params.id;
        var oldTag=prevProps.params.id;
        var firstPage=1;
        if(tag!==oldTag){
            this.setState({
                quelist:[],
                loading:true,
                tag:tag,
                page:firstPage,
                loadingMore:false
            });
            this.updateState(firstPage,tag);
        }
    }
    componentWillUnmount(){
        this.state.mounted = false;
        window.removeEventListener('scroll', ()=>{this.tagScrollUpdate()});
    }
    updateState(page,tag){
        $.ajax({
            url:'http://127.0.0.1:8080/tag',
            type:'GET',
            data:{
                page:page,
                tag:tag
            },
            success:function(listData){
                if(this.state.mounted && listData){
                    var $page=this.state.page+1;
                    this.setState({
                        quelist:listData,
                        loading:false,
                        page:$page,
                        tag:tag,
                        loadingMore:true
                    })
                }
            }.bind(this)
        })
    }
    tagScrollUpdate(){
        var scrollTop=$(window).scrollTop();
        var scrollHeight=$(document).height();
        var windowHeight=$(window).height();
        if(scrollTop+windowHeight >= scrollHeight-100 && this.state.loadingMore){
            this.setState({
                loadingMore:false,
                loading:true
            });
            var tag=this.state.tag;
            var newTag=this.state.tag ? this.state.tag :tag;
            $.ajax({
                url:'http://127.0.0.1:8080/tag',
                type:'GET',
                data:{
                    page:this.state.page,
                    tag:newTag
                },
                success:function(listData){
                    if(this.state.mounted && listData){
                        var quelist=this.state.quelist.concat(listData);
                        var $page=this.state.page+1;
                        this.setState({
                            quelist:quelist,
                            loading:false,
                            page:$page,
                            loadingMore:true
                        })
                    }
                }.bind(this)
            })
        }
    }
    render(){
        var _list=this.state.quelist.map(function(item,index){
            return (
                <li key={index}>
                    <div className="vote">
                        {item.votes}
                        <small>ͶƱ</small>
                    </div>
                    <div className="summary">
                        <Link className="summaryTitle" to ={`/question/${item.title.titleSrc}`}>
                            {item.title.content}
                        </Link>
                        <p className="user-time">{item.author} {item.time}</p>
                    </div>
                    <div className="view-answers">
                        <strong>{item.answers}</strong>/{item.views}
                    </div>
                </li>
            );
        }.bind(this));
        var isNone=!!this.state.loading ? "block":"none";
        return(
            <div className="main">
                <ul>
                    {_list}
                </ul>
                <div style={{display:isNone}} className="loading">
                    loading
                </div>
            </div>
        )
    }
}