import React, { Component } from 'react';
import Tile from './Tile';
import styles from '../../styles/index.css';
var Codebird = require("codebird");
var cb = new Codebird;
var config = require('../../data/twitter_config').config;
cb.setConsumerKey(config.consumerKey, config.consumerSecret);
cb.setToken(config.accessToken, config.accessTokenSecret);
import transGroup from 'react-addons-css-transition-group';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.getTweets = this.getTweets.bind(this);
    this.state = {
      userTweets:[]
    }
  }

  componentWillMount() {
    cb.__call(
        "oauth_authorize",
        {},
        function (auth_url) {
            cb.setBearerToken = auth_url.substr(52,auth_url.length)
        }
    );
    this.getTweets();
  }

  componentDidMount() {
    setInterval(this.getTweets,5000);
  }

  getTweets() {
    var self = this;
    var words = ['javascript','cricket','donald','elon','life','programming']
    var params = {q: words[Math.floor(Math.random() * words.length)]};
    cb.__call(
        "search_tweets",
        params,
        function (reply) {
          let arr = reply.statuses.map((item,key) =>{
            return item.user
          }) ;
          self.setState({userTweets:arr});

        }
    )
  }

  getTiles(count,col) {
    var arr = [];

    for(let i = count+1;i < this.state.userTweets.length;i++) {
      var colors = ['#FABB05', '#34A852', '#4285F4','#EA4335'];
      var animArray = ["width","height"];
      var random_color = colors[Math.floor(Math.random() * colors.length)];
      var random_anim = animArray[Math.round(Math.random()*animArray.length)];
      arr.push(<Tile key={i} refKey={this.state.userTweets[i].id} user={this.state.userTweets[i]} color={random_color} direction={random_anim} flipped={false}/>)
      if((i+1)%col == 0) {
        return arr;
      }
    }

  }
  render() {
    let row = 3;
    let col = 5;
    let transitionOptions = {
      transitionName:styles.fade,
      transitionEnterTimeOut: 500,
      transitionLeaveTimeOut: 500
    };

    var rows = [];
    var count = -1;
    var rowStle = {
      width:"calc(500%/"+col+")",
      height: "calc(100%/"+row+")"
    }
    for(let i=0;i < row;i++){
      rows.push(<div key={i} className={styles.row} style={rowStle}>{this.getTiles(count,col)}</div>);
      count = count+5;
    }

    return (
      <div className={styles.grid}>
      {this.state.userTweets.length==0?<img className={styles.loader} src='../../styles/images/loader.svg'></img>:rows}
      </div>
    );
  }
}
