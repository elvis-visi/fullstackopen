// 3 components Header, Content, and Total. 

//All data still resides in the App component, which passes the 
//necessary data to each component using props.

//header renders the name of the course
const Header = (props) => {

  let name = props.kurs.name;
  console.log(name)  

  return (

    <h1>
      {name}
    </h1>
  )

}
//content renders the parts and their number of exercises
const Content = (props) => 
{
  console.log(props.kurs.parts[0].exercise)
  return (
    
    <div>
     
       <p>
       {props.kurs.parts[0].name} : {props.kurs.parts[0].exercises}
       </p>
       <p>
       {props.kurs.parts[1].name} : {props.kurs.parts[1].exercises}
       </p>
       <p>
       {props.kurs.parts[2].name} : {props.kurs.parts[2].exercises}
       </p>

     
    </div>
  )

}

//total -> total number of exercises
const Total = (props) =>
{
  console.log(props)
return (

    <p>Number of exercises:  {props.kurs.parts[0].exercises +  props.kurs.parts[1].exercises + props.kurs.parts[2].exercises} </p>
  )

}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }


  
  
  return (
  
    <div>
      <Header kurs = {course} />
       <Content kurs = {course} />
       <Total kurs = {course} />
    </div>


  )
}

export default App


