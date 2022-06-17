
const Course = ({ course }) => {
  console.log(`Course`, { course });
 return (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

//Total of the exercises
const Total = ({ parts }) => {
  //add up the parts.exercises of each array element

  const total = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)

  return (

    <div> Total of {total} exercises</div>
  )

}

// Course component passing the name property of course
const Header = ({ name }) => {

  return (

    <h1>
      {name}
    </h1>
  )
}
//Pass the parts property of course, which is an array
const Part = ({ name, exercise }) => {
  //return 1 part:  name exercise

  console.log(`Part`,  { name }, { exercise })

  return (
    <p> {name} {exercise} </p>
  )

}

const Content = ({ parts }) => {
  // properties : name exercise id 
  //name + exercise
  console.log(`Content `, { parts });

  return (
    parts.map(parts =>
      <Part key={parts.id} name={parts.name}
        exercise={parts.exercises} />

    )

  )
}




export default Course