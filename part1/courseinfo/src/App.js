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
     
       <p>Part: {props.parts[0].name} {props.parts[0].exercises} </p>
       <p>Part: {props.parts[1].name} {props.parts[1].exercises}</p>
       <p>Part: {props.parts[2].name} {props.parts[2].exercises}</p>
      
     
    </div>
  )

}

//total -> total number of exercises
const Total = (props) =>
{
  console.log(props)
return (

    <p>Number of exercises  {props.parts[0].exercises +  props.parts[1].exercises + props.parts[2].exercises} </p>
  )

}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  
  
  return (
  
    <div>
      <Header courseTitle = {course} />
      <Content parts = {parts} />  
      <Total parts = {parts} />  
    </div>


  )
}

export default App


