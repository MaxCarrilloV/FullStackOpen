import { Container, Header, List, ListItem } from 'semantic-ui-react'
const User = ({ userData }) => {
  if (!userData) {
    return null
  }

  return (
    <Container style={{marginTop:'1em'}}>
      <Header textAlign='center' as='h1'>{userData?.name}</Header>
      <Header textAlign='center' as='h3'>added blogs</Header>
      <List bulleted>
        {userData.blogs && userData.blogs.map((blog) => <ListItem key={blog.id}>{blog.title}</ListItem>)}
      </List>
    </Container>
  )
}
export default User
