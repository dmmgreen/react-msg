import React from 'react';
import { Router, Route, Link,IndexLink , hashHistory, IndexRoute } from 'react-router';
import $ from "jquery";


export default  class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            quelist:[],
            loading:true,
            loadingMore:false,
            mounted :true
        }
    }
    scrollUpdate(){

        var scrollTop =  $(window).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight =  $(window).height();
        var _this=this;

        if (scrollTop + windowHeight >= scrollHeight -100 && this.state.loadingMore) {
            this.setState({
                loadingMore:false,
                loading:true
            });

            $.ajax({
                url: 'http://127.0.0.1:8080',
                type: 'GET',
                data: {
                    page: this.state.page,
                },
                success: function(listData) {
                    if (this.state.mounted && listData) {
                        var quelists = this.state.quelist.concat(listData);
                        var $page = this.state.page + 1;
                        this.setState({
                            quelist:quelists,
                            loading:false,
                            page:$page,
                            loadingMore:true
                        })
                    }

                }.bind(_this)
            })
        }

    }
    componentDidMount(){
        this.state.mounted = true;
        var _this=this;
        $.ajax({
            url:'http://127.0.0.1:8080',
            type: 'GET',
            data: {
                page: this.state.page
            },
            success: function(listData) {
                if (this.state.mounted) {
                    this.setState({
                        quelist:listData,
                        page:(this.state.page + 1),
                        loading:false,
                        loadingMore:true
                    })
                }

            }.bind(_this)
        });
        window.addEventListener('scroll',()=>{this.scrollUpdate()});
    }
    componenetUnmount(){
        this.state.mounted = false;
        window.removeEventListener('scroll',()=>{this.scrollUpdate()});
    }
    routerWillLeave(){
        this.state.mounted = false;
        window.removeEventListener('scroll',()=>{this.scrollUpdate()});
    }
   render(){
       var _list=this.state.quelist.map(function(value,index){
           return (
               <li key={value.title.titleSrc+index}>
                    <div className="vote">
                        {value.votes}
                        <small>投票</small>
                    </div>
                   <div className="summary">
                        <Link className="summaryTitle" to ={`/question/${value.title.titleSrc}`}>
                            {value.title.content}
                        </Link>
                       <p className="user-time">
                           {value.author} {value.time}
                       </p>
                   </div>
                   <div className="view-answers">
                        <strong>
                            {value.answers}
                        </strong>
                       /
                       {value.views}
                   </div>
               </li>
           );
       }.bind(this));
       var isNone = !!this.state.loading ? "block" : "none";
       return (
           <div className="main">
               <ul>
                   {_list}
               </ul>
               <div style={{display:isNone}} className='loading'> loading</div>
           </div>
       );
   }
}
