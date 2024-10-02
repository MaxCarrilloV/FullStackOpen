import { Link } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  Container,
  Header
} from 'semantic-ui-react'
const UserList = ({ users }) => {
  return (
    <Container>
      <Header as='h1' textAlign='center' style={{marginTop:'1em'}}>Users</Header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>Blogs created</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  )
}
export default UserList
