import './style.scss';
import exercisesData from '../../seeds/exercises.json';
import { Container, Form, Button } from 'react-bootstrap';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const getSeedData = () => exercisesData;

//Gets the type of workouts from .json file
const getUniqueTypes = () => {
  const types = new Set();
  getSeedData().forEach(item => {
    item.types.forEach(type => types.add(type));
  });
  return Array.from(types);
};

const workoutTypes = getUniqueTypes();

function Settings() {
  const [numExercises, setNumExercises] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const navigate = useNavigate();

  //Checks if one of the durations have been selected
  const handleInputChange = (event) => {
    setNumExercises(event.target.value);
  };

  //Checks which excercise have been or have not been seleceted 
  const handleTypeChange = (event) => {
    const type = event.target.id;
    setSelectedTypes(prevTypes => {
      const newTypes = new Set(prevTypes);
      if (newTypes.has(type)) {
        newTypes.delete(type);
      } else {
        newTypes.add(type);
      }
      return newTypes;
    });
  };

  const handleGenerateWorkout = () => {
    console.log('Generating workout with:', { length: numExercises, types: Array.from(selectedTypes) });
    // Add logic to generate workout and navigate to the next page
    navigate('/workout', { state: { length: numExercises, types: Array.from(selectedTypes)} })

  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="workout-length">Number of Exercises</Form.Label>
          <Form.Control
            type="input"
            id="workout-length"
            name='Number of Exercises'
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="exercise-types">Types of Exercises</Form.Label>
          {/* Creates the different types of workoutws  */}
          {workoutTypes.map((type) => (
            <div key={type} className="mb-3">
              <Form.Check
                type='checkbox'
                id={type}
                label={type}
                /*Checks if workout is selected */
                onChange={handleTypeChange}
                checked={selectedTypes.has(type)}
              />
            </div>
          ))}
        </Form.Group>
        <Button variant="primary" size="lg" onClick={handleGenerateWorkout}>
          Generate Workout
        </Button>
      </Form>
    </Container>
  );
}

export default Settings;
