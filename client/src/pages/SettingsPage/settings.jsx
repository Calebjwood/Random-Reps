import './style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import exercisesData from '../../seeds/exercises.json';

const getSeedData = () => exercisesData;

const getUniqueTypes = () => {
  const types = new Set();
  getSeedData().forEach(item => {
    item.exercise.types.forEach(type => types.add(type));
  });
  return Array.from(types);
};

function Settings() {
  const [checkedId, setCheckedId] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setCheckedId(event.target.id);
  };

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
    console.log('Generating workout with:', { duration: checkedId, types: Array.from(selectedTypes) });
    alert('Workout generation is under development.');
    navigate('/workouts', { state: { duration: checkedId, types: Array.from(selectedTypes) } })
    // Add logic to generate workout and navigate to the next page
  };

  const workoutTypes = getUniqueTypes();

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="duration">Duration</Form.Label>
          {['short', 'medium', 'long'].map((id) => (
            <div key={id} className="mb-3">
              <Form.Check
                type='radio'
                id={id}
                name='duration'
                label={id.charAt(0).toUpperCase() + id.slice(1)}
                onChange={handleCheckboxChange}
                checked={checkedId === id}
              />

            </div>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="exercise-types">Types of Exercises</Form.Label>
          {workoutTypes.map((type) => (
            <div key={type} className="mb-3">
              <Form.Check
                type='checkbox'
                id={type}
                label={type}
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
