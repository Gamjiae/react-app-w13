import { useState, Component } from "react";

function Subject({title}, {sub}) {
  const [_title, setTitle] = useState(title);
  const [_sub, setSub ] = useState(sub);

  return (
    <header>
        <h1>
          <a
            href="/"
            onClick={(e) => {
               e.preventDefault();
              this.props.onChangePage();
            }}
          >
            {_title}
          </a>
        </h1>
        {_sub}
      </header>
  )
}
/*
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>
          <a
            href="/"
            onClick={function (e) {
               e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}
*/
export default Subject;