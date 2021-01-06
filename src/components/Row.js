export default class Row extends React.Component {
  constructor(props) {
      super(props);
      this.rowRef = React.createRef();
  }

  getContainer() {
    return this.rowRef;
  };

  render() {
    return (
      <div ref={this.rowRef} name={this.props.name} className={this.props.class}>
        {this.props.children}
        <style jsx>{`
          div {
            display: flex;
            flex-direction: row;
            flex-wrap: ${this.props.wrap};
            flex-grow: 1;
            background: ${this.props.bg} no-repeat center center fixed;
            background-size: cover;
            background-color: ${this.props.bgcolor};
            background-blend-mode: ${this.props.blend};
            padding-top: 3rem;
            padding-bottom: 3rem;
            margin: ${this.props.margin};
            height: ${this.props.height};
            justify-content: ${this.props.justify};
            align-items: ${this.props.align};
          }
        `}</style>
      </div>
    );
  }
}
