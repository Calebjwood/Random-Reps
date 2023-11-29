import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Container, ListGroup, Modal, Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_WORKOUTS_BY_ID } from '../../utils/queries';

function Workouts() {
  const location = useLocation();
  const { workoutId } = useParams();
  const { length, types } = location.state || {};
  const [show, setShow] = useState(false);

  const newWorkout = useQuery(QUERY_WORKOUTS, {
    variables: { types: types, length: parseInt(length) },
    skip: !length || !types
  });

  const savedWorkout = useQuery(QUERY_WORKOUTS_BY_ID, {
    variables: { getWorkoutByIdId: workoutId },
    skip: !workoutId
  });

  const workoutData = workoutId ? savedWorkout.data?.getWorkoutById : newWorkout.data?.getWorkout;
  const exercises = workoutData?.exercises;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <h1>Workout Plan</h1>
      {workoutId ? (
        <p>Workout ID: {workoutId}</p>
      ) : (
        <>
          <p>Number of Exercises: {length}</p>
          <p>Exercise Types: {types.join(' ')}</p>
        </>
      )}
      <ListGroup>
        {exercises?.map(({ title, sets, reps, rest, link }) => (
          <div key={title}>
            <Card>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Sets: {sets}</Card.Text>
                <Card.Text>Reps: {reps}</Card.Text>
                <Card.Text>Rest: {rest} seconds</Card.Text>
                <Button variant="primary" onClick={handleShow}>
                  Example Video
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Video Title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <iframe
                      width="100%"
                      height="315"
                      src={link}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

              </Card.Body>
            </Card>
          </div>
        ))}

      </ListGroup>
      <Button variant="primary" size="lg" >
        Save Workout
      </Button>
    </Container>
  );
}

export default Workouts;