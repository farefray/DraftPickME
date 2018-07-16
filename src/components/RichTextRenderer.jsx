import redraft from 'redraft';
import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 *  You can use inline styles or classNames inside your callbacks
 */
const styles = {
  code: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontSize: 16,
    padding: 2
  },
  codeBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontSize: 16,
    padding: 20
  }
};

// just a helper to add a <br /> after a block
const addBreaklines = children => children.map((child, key) => [child, <br key={key}/>]);

const blockQuote = (children, { keys }) => <blockQuote key={keys[0]}>{ addBreaklines(children) }</blockQuote>;

/**
 * Define the renderers
 */
const renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => (
      <span key={key} style={styles.code}>
        {children}
      </span>
    )
  },

  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    unstyled: children => children.map((child, key) => {
      return <p key={key}>{child}</p>
    }),
     blockquote: (children, { keys }) => {
       return <blockQuote key={keys[0]}>{ addBreaklines(children) }</blockQuote>
    },
    "header-three": children => children.map((child, key) => { return <h3 key={key}>{child}</h3>}),
    "header-four": children => children.map((child, key) => { return <h4 key={key}>{child}</h4>}),
    "header-five": children => children.map((child, key) => { return <h5 key={key}>{child}</h5>}),
    "code-block": (children, { keys }) => (
      <pre style={styles.codeBlock} key={keys[0]}>
        {addBreaklines(children)}
      </pre>
    ),
    /*"unordered-list-item": (children, { depth, keys }) => (
      <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
        {children.map(child => <li>{child}</li>)}
      </ul>
    ),
    "ordered-list-item": (children, { depth, keys }) => (
      <ol key={keys.join("|")} className={`ol-level-${depth}`}>
        {children.map((child, index) => <li key={keys[index]}>{child}</li>)}
      </ol>
    )*/
  },
  /**
   * Entities receive children and the entity data
   */
  // key is the entity key value from raw
  entities: {
    LINK: (children, data, { key }) => (
      <Link key={key} to={data.url}>
        {children}
      </Link>
    )
  }
};

export default class RichTextRenderer extends React.PureComponent {
  static propTypes = {
    raw: PropTypes.string,
    defaultValue: PropTypes.string.isRequired
  };

  renderWarning() {
    return <div>{this.props.defaultValue ? this.props.defaultValue : 'Nothing to render.'}</div>;
  }

  isEmpty(jsonData) {
    if(!jsonData.blocks) {
      return true;
    }

    let isEmpty = true;
    jsonData.blocks.forEach(block => {
      if(block.text.trim() !== "") {
        isEmpty = false;
        return;
      }
    });

    return isEmpty;
  }

  render() {
    let { raw } = this.props;
    if (!raw) {
      return this.renderWarning();
    }

    raw = JSON.parse(raw);
    
    if(this.isEmpty(raw)) {
      console.log('rendeder is empty')
      return this.renderWarning();
    }
    
    const rendered = redraft(raw, renderers);
    // redraft returns a null if there's nothing to render
    if (!rendered) {
      return this.renderWarning();
    }

    return <div>{rendered}</div>;
  }
}
