const Header = (props) => {
    return (
      <h1> {props.course}</h1>
    )
  }
  const Part = (props) =>{
    return (
      <p> {props.name} {props.exercises}</p>
    )
  }
  const Content = ({parts}) =>{
    return (
      <div>
        {parts.map(part =>{
         return <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
        })}
        <Total total={parts.reduce((x , y)=> x + y.exercises, 0 )}></Total>
      </div>
      
    )
  }
  const Total = (props) =>{
    return (
      <h4>Total of {props.total} exercises</h4>
    )
  }
const Course = ({courses}) =>{
    return (
      <div>
        {courses.map(course => {
          return <div key={course.id}>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
          </div>
        })}
      </div>
    )
}
export default Course