import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Container, ListGroup, Modal, Card, Button } from 'react-bootstrap';
import exerciseData from '../../seeds/exercises.json'

function Workouts() {
  const location = useLocation();
  const { duration, types } = location.state;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <Container>
      <h1>Workout Plan</h1>
      <p>Duration: {duration}</p>
      <p>Exercise Types:</p>
      <ListGroup>

        <Card>
          <Card.Body>
            <Card.Title>Title:</Card.Title>
            <Card.Text>Sets: </Card.Text>
            <Card.Text>Reps: </Card.Text>
            <Card.Text>Rest: seconds</Card.Text>
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
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameborder="0"
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
      </ListGroup>
      <Button variant="primary" size="lg" >
        Save Workout
      </Button>
      {/* Additional logic to display the workout plan based on the passed data */}
    </Container>
  );
}

export default Workouts;