import './style.scss';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap'
import exercisesData from '../../seeds/exercises.json'

const getSeedData = () => {
  return exercisesData;
};

const getUniqueTypes = () => {
  const types = new Set();
  getSeedData().forEach(item => {
    item.exercise.types.forEach(type => types.add(type));
  });
  return Array.from(types);
};

function Settings() {
  const [checkedId, setCheckedId] = useState('');
  const handleCheckboxChange = (event) => {
    const id = event.target.id;
    setCheckedId(checkedId === id ? '' : id);
  };

  const workoutTypes = getUniqueTypes();

  return (
    <Container>
      <Form>
        <Form.Label htmlFor="duration">Duration</Form.Label>
        {['short', 'medium', 'long'].map((id) => (
          <div key={id} className="mb-3">
            <Form.Check
              type='checkbox'
              id={id}
              label={id.charAt(0).toUpperCase() + id.slice(1)}
              onChange={handleCheckboxChange}
              checked={checkedId === id}
              disabled={checkedId !== '' && checkedId !== id}
            />
          </div>
        ))}
        <Form.Label htmlFor="exercise-types">Types of Exercises</Form.Label>
        {workoutTypes.map((type) => (
          <div key={type} className="mb-3">
            <Form.Check
              type='checkbox'
              id={type}
              label={type}
            />
          </div>
        ))}
      </Form>
    </Container>
  );
}

export default Settings;
