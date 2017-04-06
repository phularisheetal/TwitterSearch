import React, { Component } from 'react';
import styles from '../../styles/index.css';
import transgroup from 'react-addons-css-transition-group';

export default class Tile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user:{},
      flipped: this.props.flipped,
      aniMap:{

    },
    direction:'top',
    ref:'userName'+'-'+this.props.refKey,
      stle: {  backgroundColor: this.props.color},
      fade: this.props.direction == 'height'?'slideTop-enter':'slideLeft-enter'
    }
    this.flipCard = this.flipCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var direction = this.props.direction;
    var stleWidth = {
      backgroundColor: this.props.color,
      width: "20%",
      transition: "width, 1s linear"
    }
    var stleHeight =  {
      backgroundColor: this.props.color,
      height: "100%",
      transition: "height, 1s linear"
    }
    var stleBcp = direction == "width"?stleWidth:stleHeight

    this.setState({
      user: nextProps.user,
      direction:nextProps.direction,
      ref:'userName'+'-'+this.props.refKey,
      fade: this.props.direction == 'height'?'slideTop-enter-active':'slideLeft-enter-active'
    });

    document.getElementById(this.state.ref).className='';
    document.getElementById(this.state.ref).className=styles.userName;

  }

  componentDidUpdate() {
      }

  flipCard() {
    this.setState({flipped: !this.state.flipped})
  }
  render() {

    let trsnfrm = this.state.aniMap[this.state.direction];

    let stl = {
      backgroundColor:this.props.color
    }

  var flippedCSS = this.state.flipped ?styles.cardFlipped : styles.card;
    return (
      <transgroup transitionName={this.props.direction == 'height'?"slideTop":"slideLeft"} transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionAppear={true}>
      <div className={styles.container+' '+styles[this.state.fade] } style={this.state.stle} id={'container-'+this.state.ref}>
        <div className={flippedCSS+' '+styles.card} onClick={this.flipCard}>
          <div className={styles.front}>
            <h3 className={styles.userName} ref={this.state.ref} id={this.state.ref}>{this.state.user.name}</h3>
          </div>
          <div className={styles.back}>
          <div className={styles.userDetails}>
            <p className={styles['user-name']}>{this.state.user.screen_name}</p>
            <div>
              <p>{this.state.user.location}</p>
              <p>{this.state.user.time_zone}</p>
              <a href={this.state.user.url}>{this.state.user.url}</a>
            </div>
          </div>
            <div className={styles.dp}><img src={this.state.user.profile_image_url}/></div>
          </div>
      </div>
      </div>
      </transgroup>
    );
  }
}
