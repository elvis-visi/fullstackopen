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
  console.log(props)
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
  console.log(props)
return (

    <p>Number of exercises {props.exercises}</p>
  )

}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 
  {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  
  return (
    <div>
      <Header courseTitle = {course} />
      <Content part = {part1.name} Content exercise = {part1.exercises}/>
      <Content part = {part2.name} Content exercise = {part2.exercises}/>
      <Content part = {part3.name} Content exercise = {part3.exercises}/>
      <Total exercises = {part1.exercises + part2.exercises  + part3.exercises }/>
    </div>


  )
}

export default App


