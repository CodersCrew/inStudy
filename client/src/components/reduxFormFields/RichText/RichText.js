import React from 'react';
import { getEventRange, getEventTransfer } from 'slate-react';
import { Value, Block } from 'slate';
import Video from './RichTextVideo';

import 'antd';
import { SVGIcon } from '../../index';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import initialValue from './RichTextValue.json';
import { isKeyHotkey } from 'is-hotkey';
import {
  StyledEditor,
  Button,
  Toolbar,
  Bold,
  Italic,
  Underlined,
  BlockQuote,
  One,
  Two,
  Ul,
  Ol,
  Image,
} from './RichTextStyle';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const isImage = url => {
  return !!imageExtensions.find(url.endsWith);
}

function insertImage(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'image',
    data: {
      src,
    },
  });
}

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (change, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph');
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
    video: {
      isVoid: true,
    },
  },
};

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
          {this.renderMarkButton('bold', 'bold-solid.svg')}
          {this.renderMarkButton('italic', 'italic-solid.svg')}
          {this.renderMarkButton('underlined', 'underline-solid.svg')}
          {this.renderBlockButton('heading-one', 'number-one-in-a-circle.svg')}
          {this.renderBlockButton('heading-two', 'number-two-in-a-circle.svg')}
          {this.renderBlockButton('block-quote', 'quote-right-solid.svg')}
          {this.renderBlockButton('numbered-list', 'list-ol-solid.svg')}
          {this.renderBlockButton('bulleted-list', 'list-ul-solid.svg')}
          <Button onMouseDown={this.onClickImage}>
            <SVGIcon path="/fa-icons/image-solid.svg" fill="currnetColor" width="15px" height="15px"/>
          </Button>
        </Toolbar>
        <StyledEditor
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          value={this.state.value}
          onChange={this.onChange}
          schema={schema}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          onDrop={this.onDropOrPaste}
        />
      </div>
    );
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => this.onClickMark(event, type)}>
        <SVGIcon path={`/fa-icons/${icon}`} fill="currnetColor" width="15px" height="15px" />
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
        <SVGIcon path={`/fa-icons/${icon}`} fill="currentColor" width="15px" height="15px" />
      </Button>
    );
  };

  renderNode = props => {
    const { attributes, children, node, isFocused } = props;

    switch (node.type) {
      case 'block-quote':
        return <BlockQuote {...attributes}>{children}</BlockQuote>;
      case 'bulleted-list':
        return <Ul {...attributes}>{children}</Ul>;
      case 'heading-one':
        return <One {...attributes}>{children}</One>;
      case 'heading-two':
        return <Two {...attributes}>{children}</Two>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <Ol {...attributes}>{children}</Ol>;
      case 'image': {
        const src = node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
      }
      case 'video':
        return <Video {...props} />;
    }
}


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

  onClickImage = event => {
    event.preventDefault();
    const src = window.prompt('Enter the URL of the image:');
    if (!src) return;

    const change = this.state.value.change().call(insertImage, src);

    this.onChange(change);
  };

  onDropOrPaste = (event, change, editor) => {
    const target = getEventRange(event, change.value);
    if (!target && event.type == 'drop') return;

    const transfer = getEventTransfer(event);
    const { type, text, files } = transfer;

    if (type == 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/');
        if (mime != 'image') continue;

        reader.addEventListener('load', () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }

    if (type == 'text') {
      if (!isUrl(text)) return;
      if (!isImage(text)) return;
      change.call(insertImage, text, target)
    }
  }

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
