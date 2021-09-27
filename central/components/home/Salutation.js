import React from "react";
import { Text } from "react-native";
import homeStyles from "./homeStyles";
import { getUserInfo, getUserName } from "../../app/redux/auth/actions";
import { connect } from "react-redux";

class Salutation extends React.Component {
  componentDidMount=()=>{
    if(!this.props.identityUser){
      this.props.getUserName();
    }
  }

  componentDidUpdate=()=>{
    if(this.props.identityUser && !this.props.user && !this.props.loading){
      this.props.getUserInfo(this.props.identityUser.sub);
    }
  }

 getGreetings = () => {
    let hours = new Date().getHours();
    let greetings = "";
    if (hours >= 6 && hours < 12) {
        greetings = "Good-morning";
    } else if (hours >= 12 && hours < 18) {
        greetings =  "Good-afternoon";
    } else {
        greetings =  "Good-evening";
    }
    return greetings;
  }

  render(){
    return <Text style={homeStyles.greetings}>{this.getGreetings()}{this.props.user ? (", " + this.props.user.first_name) : ""}</Text>;
  }
}


const mapStateToProps = ({ authUser }) => {
  const { identityUser, user, loading, error } = authUser;
  return { identityUser, user, loading, error };
};

const mapActionToProps = { getUserInfo, getUserName };

export default connect(mapStateToProps, mapActionToProps)(Salutation);