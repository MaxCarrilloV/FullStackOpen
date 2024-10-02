import PropTypes from 'prop-types'
import {
  Button,
  Form,
  Segment,
  FormInput,
  GridColumn,
  Header,
  Grid,
} from 'semantic-ui-react'
const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <GridColumn style={{ maxWidth: 450 }}>
        <Header color='Black' as="h1">Log in to application</Header>
        <Form onSubmit={handleLogin} size="large">
          <Segment>
            <FormInput
              fluid
              icon='user'
              iconPosition='left'
              placeholder="Username:"
              data-testid="username"
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <FormInput
              icon='lock'
              iconPosition='left'
              fluid
              placeholder="Password:"
              data-testid="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button type="submit" fluid size='large' color='black'>
              Login
            </Button>
          </Segment>
        </Form>
      </GridColumn>
    </Grid>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
export default LoginForm
