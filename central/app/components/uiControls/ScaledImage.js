import React, { Component } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = { source: { uri: this.props.imageUri.toString() } };
  }

  componentWillMount() {
    Image.getSize(this.props.imageUri.toString(), (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({
          width: this.props.width,
          height: height * (this.props.width / width),
        });
      } else if (!this.props.width && this.props.height) {
        this.setState({
          width: width * (this.props.height / height),
          height: this.props.height,
        });
      } else {
        this.setState({ width: width, height: height });
      }
    });
  }

  render() {
    return this.state.source &&
      this.state.height > 0 &&
      this.state.width > 0 ? (
      <Image
        source={this.state.source}
        style={{ height: this.state.height, width: this.state.width }}
      />
    ) : null;
  }
}

ScaledImage.propTypes = {
  imageUri: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ScaledImage;
