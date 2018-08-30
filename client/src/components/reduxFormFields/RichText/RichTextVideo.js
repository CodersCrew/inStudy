import React from 'react';
import { Input } from '../index';

class Video extends React.Component {
  onChange = e => {
    const video = e.target.value;
    const { node, editor } = this.props;
    editor.change(c => c.setNodeByKey(node.key, { data: { video } }));
  }

  onClick = e => {
    e.stopPropagation();
  };

  render() {
    const { isSelected } = this.props;

    return (
      <div {...this.props.attributes}>
        {this.renderVideo()}
        {isSelected ? this.renderInput() : null}
      </div>
    )
  }

  renderVideo = () => {
    const { node, isFocused } = this.props;
    let video = node.data.get('video');
    if (video){
      video = `https://www.youtube.com/embed/${this.getIdVideo(video)}`;
    }
    const wrapperStyle = {
      position: 'relative',
      outline: isFocused ? '2px solid #d9d9d9' : 'none',
    };

    const maskStyle = {
      display: isFocused ? 'none' : 'block',
      position: 'absolute',
      width: '200px',
      height: '170px',
      top: '0',
      left: '0',
      cursor: 'pointer',
      zIndex: 1,
    };

    const iframeStyle = {
      display: 'block',
      marginTop: '10px',
      marginBottom: '10px',
      marginLeft: 'calc(50% - 200px)',
    };

    return (
      <div style={wrapperStyle}>
        <div style={maskStyle} />
        <iframe
          id="ytplayer"
          type="text/html"
          width="400"
          height="270"
          src={video}
          frameBorder="0"
          style={iframeStyle}
        />
      </div>
    );
  };

  getIdVideo = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
      return (match && match[7].length == 11) ? match[7] : false;
  };

  renderInput = () => {
    const { node } = this.props;
    var video = node.data.get('video');
    const style = {
      marginLeft: 'calc(50% - 200px)',
      boxSizing: 'border-box',
      width: '400px',
    };
    return (
      <input
        name="VideoInput"
        value={video}
        onChange={this.onChange}
        onClick={this.onClick}
        style={style}
        placeholder="Podaj adres url video"
      />
    );
  };
}

export default Video;
