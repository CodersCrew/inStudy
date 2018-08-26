import React from 'react';
import { Value } from 'slate';
import 'antd';

import initialValue from './RichTextValue.json';
import { isKeyHotkey } from 'is-hotkey';
import {
  StyledEditor,
  Button,
  Icon,
  Toolbar,
  Bold,
  Italic,
  Underlined,
  BlockQuote,
  One,
  Two,
} from './RichTextStyle';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class RichTextExample extends React.Component {
  state = {
    value: Value.fromJSON(initialValue),
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
  };

  render() {
    return (
      <div>
        <Toolbar>
          {this.renderMarkButton('bold', 'B')}
          {this.renderMarkButton('italic', 'I')}
          {this.renderMarkButton('underlined', '_')}
          {this.renderBlockButton('heading-one', 'one')}
          {this.renderBlockButton('heading-two', 'two')}
          {this.renderBlockButton('block-quote', 'quo')}
          {this.renderBlockButton('numbered-list', 'ol')}
          {this.renderBlockButton('bulleted-list', 'ul')}
        </Toolbar>
        <StyledEditor
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => this.onClickMark(event, type)}>
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock('list-item') && parent && parent.type === type;
    }

    return (
      <Button active={isActive} onMouseDown={event => this.onClickBlock(event, type)}>
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <BlockQuote {...attributes}>{children}</BlockQuote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <One {...attributes}>{children}</One>;
      case 'heading-two':
        return <Two {...attributes}>{children}</Two>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <Bold {...attributes}>{children}</Bold>;
      case 'italic':
        return <Italic {...attributes}>{children}</Italic>;
      case 'underlined':
        return <Underlined {...attributes}>{children}</Underlined>;
    }
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });
      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  };
}

export default RichTextExample;
