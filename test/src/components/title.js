import React, { Component } from 'react';
import { genericAction } from '../redux';
import { connect } from 'react-redux';
import { StyledButton } from '../styled-components';
import P from 'prop-types';

class TitleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  toggle = e => {
    e.preventDefault();
    this.props.genericAction({show: !this.state.show });
    this.setState({show: !this.state.show });
  }

  render () {
    return (
      <div>
        {this.props.title}
        <StyledButton onClick={this.toggle}>Click Me to Toggle Local State & Redux State</StyledButton>
        State: {this.state.show ? 'true' : 'false'}
      </div>
    );
  }
}

TitleComponent.propTypes = {
  title: P.string
}

// Redux Boilerplate
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
  return {
    genericAction: (data) => dispatch(genericAction(data))
  }
}
const Title = connect(mapStateToProps, mapDispatchToProps)(TitleComponent);
export { Title };

