// 3 components Header, Content, and Total. 

//All data still resides in the App component, which passes the 
//necessary data to each component using props.

//header renders the name of the course
const Header = (props) => {

  console.log(props)

  return (

    <h1>
      {props.courseTitle}
    </h1>
  )

}
//content renders the parts and their number of exercises
const Content = (props) => 
{
  return (
    
    <div>
      <p>
       Part: {props.part} {props.exercise}
      </p>
    </div>
  )

}

//total -> total number of exercises
const Total = (props) =>
{
return (

    <p>Number of exercises {props.exercises}</p>
  )

}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseTitle = {course}/>
      <Content part = {part1} Content exercise = {exercises1}/>
      <Content part = {part2} Content exercise = {exercises2}/>
      <Content part = {part3} Content exercise = {exercises3}/>
      <Total exercises = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App


