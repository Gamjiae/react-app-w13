// React 라이브러리와 Component 클래스를 import
import { Component } from "react";
import "./App.css";

// 다른 컴포넌트들을 import
import ReadContent from "./components/ReadContent";
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

// 이미지 파일들을 import
import hamImg from "./img/hamster.webp";
import goldenImg from "./img/goldenhamster.jpg";
import dwarfImg from "./img/dwarfhamster.jpg";
import puddingImg from "./img/puddinghamster.webp";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      selected_content_id: 0,
      subject: { title: "햄스터 사전", sub: "햄스터는 귀여워!" },
      welcome: { title: "햄스터", desc: "안녕하세요 햄스터 사전에 오신것을 환영합니다. 골든햄스터, 드워프햄스터, 푸딩햄스터에 관한 설명을 제공하고 있습니다. 추후 다양한 햄스터의 설명이 더 제공될 예정입니다.", image: hamImg },
      contents: [
        { id: 1, title: "골든햄스터", desc: "설치목 비단털쥐과 비단털쥐아과 시리아햄스터속 (Mesocricetus)의 생물을 말한다.\n 실험용으로 많이 사육하다 현재는 애완용으로 많이 사육한다.\n 한국에서 사육하는 시리아햄스터속 생물은 시리아햄스터가 절대 다수로, 다른 시리아햄스터속 햄스터는 애완용으로 기르는 것을 찾아보기 어렵다.", image: goldenImg },
        { id: 2, title: "드워프햄스터", desc: "설치목 비단털쥐과 비단털쥐아과 난쟁이햄스터 또는 드워프햄스터속(Phodopus)의 생물을 말한다. 비단털등줄쥐속(Cricetulus)에 속한 햄스터들도 크기가 작아 '000 드워프햄스터' 같은 종명이 붙어있긴 하지만 생김새도 햄스터보단 흔히 생각하는 쥐에 가깝다. 게다가 중국햄스터(C.griseus)말고는 애완용으로 사육되는 경우도 적다.", image: dwarfImg },
        { id: 3, title: "푸딩햄스터", desc: "돌연변이로 여름이나 겨울이나 털색이 계속 희게 유지되는 펄페이드가 있는데, 흔히 말하는 펄햄스터이다. 이외에도 전체적으로 노란색인 푸딩, 등줄이 노란색인 펄짱, 등줄이 희미하고 등이 회색인 사파이어 등이 있다. 국내에는 그렇게까지 품종이 다양하지는 않으며 외국에서 사용하는 품종의 명칭과 차이가 있다.", image: puddingImg }
      ],
    };
  }

  getReadContent() {
    var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title,
      _desc,
      _image,
      _article = null;
    // 현재 모드에 따라서 title, desc, image를 결정합니다.
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _image = this.state.welcome.image;
      _article = (<ReadContent title={_title} desc={_desc} img={_image}></ReadContent>);
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent()
      _article = (<ReadContent title={_content.title} desc={_content.desc} img={_content.image}></ReadContent>);
    }
    else if (this.state.mode === "create") {
      _article = (<CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat({
          id: this.max_content_id,
          title: _title,
          desc: _desc,
          image: "",
        });
        this.setState({contents: _contents});
      }.bind(this)}></CreateContent>);
    }
    else if (this.state.mode === "update") {
      var _content = this.getReadContent();
      _article = (
      <UpdateContent 
        data = {_content}
        onSubmit = {function(_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i++;
          }
          this.setState({contents: _contents});
      }.bind(this)}></UpdateContent>);
    }
    return _article;
  }

  render() {
    // 최종적으로 렌더링될 JSX를 return합니다.
    return (
      <div className="App">
        {/* Subject 컴포넌트는 웹사이트의 제목 부분을 렌더링합니다. */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" }); // 클릭 시 mode를 'welcome'으로 설정합니다.
          }.bind(this)}
        ></Subject>
        {/* TOC 컴포넌트는 Table of Contents를 렌더링합니다. */}
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read", // 클릭 시 mode를 'read'로 설정합니다.
              selected_content_id: Number(id), // 선택된 컨텐츠의 id를 설정합니다.
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode) {
          if(_mode === "delete") {
            if (window.confirm("really?")) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                } 
                i++;
              }
            }
            this.setState({ mode: "welcome", contents: _contents});
          }
          else {
            this.setState({mode: _mode});
          }
        }.bind(this)}></Control>
        {this.getContent()}
        {/* Content 컴포넌트는 선택된 컨텐츠의 내용과 이미지를 렌더링합니다. */}
      </div>
    );
  }
}

export default App;