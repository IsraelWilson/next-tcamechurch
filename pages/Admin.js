export default class Admin extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: []
    };
  }

  getTally() {
    fetch('/tally').then((res) => res.json()).then((res) => { console.log(res)}).catch((err) => { console.log(err)})
    })
  }

  componentDidMount() {
    getTally()
  }

  render() {
    return (
      <div>
        <input>
        <button></button>
        <style jsx>{`

        `}</style>
      </div>
    );
  }
}
