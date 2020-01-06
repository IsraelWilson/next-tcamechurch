import React from 'react'
import Row from '../components/Row.js'
import Column from '../components/Column.js'
import ColumnBasis from '../components/ColumnBasis.js'
import NavBar from '../components/NavBar.js'
import Progress from '../components/Progress.js'
import ImageLink from '../components/ImageLink.js'
import Contact from '../components/Contact.js'
import Position from '../components/Position.js'
import Education from '../components/Education.js'
import Bio from '../components/Bio.js'

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {navbar: "clean",
                  about: false,
                  experience: false,
                  skills: false,
                  education: false,
                  socialize: false,
                  contact: false};

    this.navbarRef = React.createRef();
    this.aboutRef = React.createRef();
    this.experienceRef = React.createRef();
    this.skillsRef = React.createRef();
    this.educationRef = React.createRef();
    this.socializeRef = React.createRef();
    this.contactRef = React.createRef();

    this.divOffsetTop = 0;
    this.aboutOffsetTop = 0;
    this.experienceOffsetTop = 0;
    this.skillsOffsetTop = 0;
    this.educationOffsetTop = 0;
    this.socializeOffsetTop = 0;
    this.contactOffsetTop = 0;

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.divOffsetTop = this.navbarRef.current.getContainer().current.offsetTop;
    this.aboutOffsetTop = this.aboutRef.current.getContainer().current.offsetTop;
    this.experienceOffsetTop = this.experienceRef.current.getContainer().current.offsetTop;
    this.skillsOffsetTop = this.skillsRef.current.getContainer().current.offsetTop;
    this.educationOffsetTop = this.educationRef.current.getContainer().current.offsetTop;
    this.socializeOffsetTop = this.socializeRef.current.getContainer().current.offsetTop;
    this.contactOffsetTop = this.contactRef.current.getContainer().current.offsetTop;

    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(event) {
    if(window.scrollY >= this.divOffsetTop) {
      this.setState({navbar: "sticky"});
    } else {
      this.setState({navbar: "clean"});
    }

    if(window.scrollY >= this.aboutOffsetTop){
      this.setState({about: true,
                     experience: false,
                     skills: false,
                     education: false,
                     socialize: false,
                     contact: false});
    }

    if(window.scrollY >= this.experienceOffsetTop){
      this.setState({about: false,
                     experience: true,
                     skills: false,
                     education: false,
                     socialize: false,
                     contact: false});
    }

    if(window.scrollY >= this.skillsOffsetTop){
      this.setState({about: false,
                     experience: false,
                     skills: true,
                     education: false,
                     socialize: false,
                     contact: false});
    }

    if(window.scrollY >= this.educationOffsetTop){
      this.setState({about: false,
                     experience: false,
                     skills: false,
                     education: true,
                     socialize: false,
                     contact: false});
    }

    if(window.scrollY >= this.socializeOffsetTop){
      this.setState({about: false,
                     experience: false,
                     skills: false,
                     education: false,
                     socialize: true,
                     contact: false});
    }

    if(window.scrollY >= this.contactOffsetTop){
      this.setState({about: false,
                     experience: false,
                     skills: false,
                     education: false,
                     socialize: false,
                     contact: true});
    }
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        scroll: this.state.scroll
      });
    });

    return (
      <div>
        <Row name="landing" height="85vh" bg="url('https://lh4.googleusercontent.com/jlLx4XvQ3TE6A2HmYuJWUNywOEijDpGVpjAv15jjAKxv67iXAFhWDuvBrUk=w2400')" bgcolor="#232323" blend="luminosity">
        </Row>
        <NavBar ref={this.navbarRef} section={this.state} class={this.state.navbar}/>
        <Row ref={this.aboutRef} name="about" justify="center" align="center" margin="0 0 10rem">
          <Bio title="WHO I AM" sub="Programmer. Gamer. Comic book buff." desc="I am a software engineer located in the Dallas Fort Worth area.
             My focus is on designing simple, easy to use web apps and android apps for small businesses. I like to spend my down time playing a video games, reading, and
             hanging out with friends." src="/static/img/bio.png" />
        </Row>

        <Row ref={this.experienceRef} name="experience" justify="center" margin="0 0 10rem">
          <ColumnBasis>
            <h1>WHERE IVE BEEN</h1>
            <hr/>
            <Row>
              <Position title="Software Engineer" desc="At Oceus I am responsible for the creation and maintenence of system APIs, and improving software performance while
                  focusing on a user friendly experience. We deliver mobile solutions integrating fixed and wireless broadband technologies that enable secure, high-speed voice, video, and data communication." date="September 2018 - Current" company="Oceus Networks" />

              <Position title="Application Designer" desc="As an appication designer at DXC I helped manage Agility, a cloud based application that simlpified virtual machine
                  deployment and migration. Here I did a lot of scripting in bash and JavaScript, created virtual machine templates, and performed system administration." date="May 2016 - May 2018" company="DXE Technology" />

              <Position title="Urban Prep Fellow" desc="I managed the content presented across the Urban Prep website using Americaneagle's CMS and began developing my skills as
                  a full stack developer. I performed software updates and some system administration as an IT assistant." date="August 2015 - May 2016" company="Urban Prep Academies" />

              <Position title="Technical Support" desc="My responsibilities as technical support included network management, updating/managing operating system images, delivery
                  and installation of workstations, and ordering hardware. This is what I consider my first oppertunity as a technical professional." date="May 2012 - May 2013" company="Fulton County Information Technology" />
             </Row>
           </ColumnBasis>
        </Row>

        <Row ref={this.skillsRef} name="skills" justify="center" margin="5rem 0 5rem">
          <ColumnBasis>
            <h1>WHAT I DO</h1>
            <hr/>
            <Row>
              <Column align="center">
              <Progress value="50" name="C++"></Progress>
              <Progress value="60" name="Java"></Progress>
              <Progress value="50" name="PHP"></Progress>
              <Progress value="80" name="Python"></Progress>
              </Column>

              <Column align="center">
                <Progress value="90" name="HTML"></Progress>
                <Progress value="70" name="CSS"></Progress>
                <Progress value="50" name="MySQL"></Progress>
                <Progress value="75" name="Javascript"></Progress>
              </Column>

              <Column align="center">
                <Progress value="65" name="React"></Progress>
                <Progress value="60" name="Android Studio"></Progress>
                <Progress value="25" name="Unreal Engine"></Progress>
                <Progress value="50" name="Illustrator"></Progress>
              </Column>
            </Row>
          </ColumnBasis>
        </Row>

        <Row ref={this.educationRef} name="education" justify="center" align="center" margin="5rem 0 5rem">
          <ColumnBasis>
            <h1>WHERE I STUDIED</h1>
            <hr/>
            <Row>
              <Education date="2010" school="Morehouse College" degree="B.S. in Computer Science"/>

              <Education date="2015" school="Urban Prep Academy" degree="High School Diploma"/>
            </Row>
          </ColumnBasis>
        </Row>

        <Row ref={this.socializeRef} name="socialize" justify="center" margin="5rem 0 5rem">
          <ColumnBasis>
            <h1>WHERE I SOCIALIZE</h1>
            <hr/>
            <Row>
                <ImageLink href="#" src="https://lh4.googleusercontent.com/S7Dy_3vyxT2fKa0bNQUCF5sp0jMdbTzOD-NvEbF4J8KXyuDeip0fqOrZj0E=w2400"/>
                <ImageLink href="#" src="https://lh5.googleusercontent.com/2dYiX-eNSXHh6yLRKU3Invh_6lRuXALEEUdeObV__m1cx8vocxHUi74CT4M=w2400"/>
                <ImageLink href="#" src="https://lh3.googleusercontent.com/zO4SpqGyr31JanKq41ogaBXDIxmX_yCFIR6pskWD2RcNWz0Hyd-T5nGc4Ro=w2400"/>
                <ImageLink href="#" src="https://lh5.googleusercontent.com/gDuOiKicjDsqC3rY0FnaZFB3hwMwrO9Qn12BWbD7qFS4Fpi6yAWqP8-EZL4=w2400"/>
            </Row>
          </ColumnBasis>
        </Row>

        <Row ref={this.contactRef} name="contact" justify="center" align="center">
          <ColumnBasis>
            <h1>GET IN TOUCH</h1>
            <hr/>
            <Contact/>
          </ColumnBasis>
        </Row>

        <style jsx>{`
          div {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            align-self: center;
          }
        `}</style>
      </div>
    );
  }
}
