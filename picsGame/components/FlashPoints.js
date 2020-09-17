import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ReactCSSTransitionGroup from 'react-transition-group';

class FlashPoints extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     points: this.props.points
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   let _this = this;
  //   this.setState({
  //     points: nextProps.points
  //   });
  //   if (nextProps.autoDisappear) {
  //     window.setTimeout(() => {
  //       _this.setState({
  //         points: null
  //       })
  //     }, 2000)
  //   }
  // }

  // onClick(e) {
  //   this.setState({
  //     points: null
  //   });
  // }

  // render() {
  //   let transitionName = "flash-anim"
  //   if (this.state.points) {
  //     return (
  //       <ReactCSSTransitionGroup transitionAppear={true}　transitionName={transitionName} transitionEnterTimeout={200} transitionLeaveTimeout={300}>
  //         <div className="flash-container" id="flash-component">
  //           <div className="alert">
  //             <a className="close alert-close" onClick={this.onClick.bind(this)}>x</a>
  //             {this.state.points}
  //           </div>
  //         </div>
  //       </ReactCSSTransitionGroup>
  //     );
  //   } else {
  //     return <ReactCSSTransitionGroup transitionAppear={true}　transitionName={transitionName} transitionEnterTimeout={200} transitionLeaveTimeout={300} />;
  //   }
  // }
  render() {
    return (
      <Text>Hi</Text>
    )
  }
}

export default FlashPoints;