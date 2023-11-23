import { Container, Button } from 'react-bootstrap';

function Workouts() {


  return (
    <Container>
      <h1>Workout Plan</h1>
      <Button variant="primary" size="lg" onClick={}>
          Save Workout
        </Button>
      {/* Additional logic to display the workout plan based on the passed data */}
    </Container>
  );
}

export default Workouts;
