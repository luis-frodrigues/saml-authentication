import { SignIn, withOAuth } from 'aws-amplify-react';

class SamlLoginContainer extends SignIn {
  interval = null;

  componentDidMount() {
    if (shouldRedirect()) {
        this.props.OAuthSignIn();
    }
  }

  shouldRedirect = () => {
      return this.props.authState === 'signIn' || this.props.authState === 'loading';
  }

  render() {
    return this.shouldRedirect() && 'redirecting...';
  }
}

export default withOAuth(SamlLoginContainer);