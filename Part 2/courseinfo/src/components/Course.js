const Course = ({ course }) => {
  let total = course.parts.reduce(
    (previousValue, currentObject) => previousValue + currentObject.exercises,
    0
  );

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  );
};

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <b>total of {sum} exercises</b>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

export default Course;