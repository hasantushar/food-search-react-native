import React from 'react';
import ButtonContainer from './ButtonContainer';
import Button from './Button';
import Page from './Page';
import { authorizeToken, revokeToken } from "../../redux/auth/actions";
import { connect } from "react-redux";

class Login extends React.Component {

  componentDidUpdate(){
    if(this.props.accessToken){
      if(!this.props.isSignOut){
        this.props.navigation.navigate('Home');
      }
    }
  }  

  handleAuthorize(){
    this.props.authorizeToken();
  }

  handleRevoke(){
    this.props.revokeToken(this.props.refreshToken);
  }

  render(){
    return(
      <Page>
        <ButtonContainer>
          {!this.props.accessToken ? (
            <>
              <Button
                onPress={this.handleAuthorize.bind(this)}
                text="Login"
                color="#DA2536"
              />
            </>
          ) : null}
          {this.props.accessToken ? (
            <> 
              <Button onPress={() => this.handleRevoke()} text="Sign Out" color="#24C2CB" />
            </>
          ) : null}
        </ButtonContainer>
      </Page>
    )
  }

}

const mapStateToProps = ({ authUser }) => {
    const { hasLoggedInOnce, accessToken, refreshToken, isSignOut, loading, error } = authUser;
    return { hasLoggedInOnce, accessToken, refreshToken, isSignOut, loading, error };
};
  

const mapActionToProps = { authorizeToken, revokeToken };
  
export default connect(mapStateToProps, mapActionToProps)(Login);