interface total {
  total: number;
}
const Total = (props: total) => {
  return <p>Number of exercises {props.total}</p>;
};
export default Total;
