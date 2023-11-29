import './style.scss';
import background from '../../assets/images/background.jpg'
import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';

export default function Home() {

  return (
    <Container className="p-3" fluid>
      <div id="home-page" className="text-center">
        <Image
          src={background}
          alt="Random Reps"
          className="img-fluid"
        />
        <div className="card-footer">
          <h2 className="h3-responsive">Find your next workout!</h2>
          <Link to="/settings">
            <button className="btn btn-lg btn-danger">Generate Workout</button>
          </Link>
        </div>
      </div>
    </Container>
  );
}


