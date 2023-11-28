import './style.scss';
import background from '../../assets/images/background.jpg'
import { Link } from 'react-router-dom';
import { Image} from 'react-bootstrap';

export default function Home() {

  return (
    <div id="home-page">
      <div className="text-center m-3">
        <Image 
          src={background}
          alt="Random Reps"
          className="img-fluid" 
        />
        <div className="card-footer">
          <h2>Find your next workout!</h2>
          <Link to="/settings">
            <button className="btn btn-lg btn-danger">Generate Workout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}


