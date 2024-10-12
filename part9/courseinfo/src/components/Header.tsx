interface header {
  name: string;
}
const Header = (props: header) => {
  return <h1>{props.name}</h1>;
};
export default Header;
