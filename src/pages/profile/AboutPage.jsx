import React from "react";
import PropTypes from 'prop-types';
import Editable from "react-x-editable";
import EditableField from "./components/EditableField";
import { userActions } from "../../actions";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    const { user } = props;
    console.log('about page constructor');
    console.log(user);
    this.state = {
      user: user
    }

    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('about compoennt update')
    console.log(prevProps, prevState);
  }

  updateProfile = (field, val) => {
    console.log('AboutPage update');
    console.log(field, val);
    console.log(this.state);
    let updatedUser = this.state.user;
    updatedUser[field] = val;
    this.setState({
      user: updatedUser
    });

    this.props.dispatch(userActions.edit(updatedUser));
  }

  render() {
    let sectionStyle = {
      background: "url('/images/about.png') no-repeat top center fixed",
      backgroundSize: "cover",
      backgroundColor: "#e6e6e6",
      backgroundBlendMode: "overlay",
      height: "100%"
    };

    let { user } = this.props;
    console.log('user in render');
    console.log(user);
    let canEditProfile = !true; // TODO
    return (
      <section id="about" style={sectionStyle}>
        <div className="container">
          <div className="row animated fadeInUp">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  className="img-responsive"
                  alt="profile-img"
                  src="http://placehold.it/270x340"
                />
              </div>
              <div>
                <a className="black-button" href="downloads/cv.pdf">
                  <i className="fa fa-download" />
                  Download CV
                </a>
              </div>
            </div>
            <div className="col-md-8">
              <div className="about-info">
                <h2>
                  <span>Hello I'm </span>
                  {user.lastName} {user.firstName}
                </h2>
                <div className="strong-p">
                  <Editable
                    name="title"
                    dataType="custom"
                    value={user.title}           
                    customComponent={(props, state) => {
                      return (<EditableField {...props} {...state} onChanged={this.updateProfile}/>);
                    }}                         
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  vitae tortor rhoncus elit ornare euismod. Donec in erat neque.
                  Etiam cursus vel est eget scelerisque. Vestibulum vitae arcu a
                  leo porttitor tincidunt. Nulla facilisi. Nunc tempor lectus
                  lectus. Aenean finibus lobortis quam et faucibus. Nam eget
                  diam id turpis iaculis hendrerit. Pellentesque a lectus
                  tempus, iaculis nunc eu, ultricies magna. Integer eleifend
                  posuere neque, ultrices porta dui scelerisque quis. Fusce
                  dictum vestibulum est, ac rutrum augue consectetur a.
                </p>
                <div className="info">
                  <div className="col-md-6 no-padding-left">
                    <ul>
                      <li>
                        <p className="info-title">Age </p>
                        <span className="info-details"> 28</span>
                      </li>
                      <li>
                        <p className="info-title">Address </p>
                        <span className="info-details">
                          {" "}
                          22 Place, Los Angelos
                        </span>
                      </li>
                      <li>
                        <p className="info-title">Email </p>
                        <span className="info-details">
                          {" "}
                          Johndoe@mywebsite.com
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 no-padding-left">
                    <ul>
                      <li>
                        <p className="info-title">Phone </p>
                        <span className="info-details"> +002 123 456 789</span>
                      </li>
                      <li>
                        <p className="info-title">Website </p>
                        <span className="info-details"> www.mywebsite.com</span>
                      </li>
                      <li>
                        <p className="info-title">Country </p>
                        <span className="info-details"> Australia</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 no-padding-left">
                    <ul>
                      <li className="social-media">
                        <p className="info-title">Social Links</p>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-google-plus" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-behance" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-dribbble" />
                        </a>
                      </li>
                      <li className="social-media icons">
                        <a href="#" target="_blank">
                          <i className="fa fa-pinterest" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AboutPage.propTypes = {
  user: PropTypes.object.isRequired
};


export { AboutPage };
