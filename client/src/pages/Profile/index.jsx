import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { USER_PROFILE } from '../../utils/actions';
import { QUERY_USER } from '../../utils/queries';
import { useStoreContext } from '../../utils/store-context';
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import ActivityFeed from '../../components/ActivityFeed';
import './style.scss';

export default function Profile() {
  const [user, dispatch] = useStoreContext('user');
  const { data, loading } = useQuery(QUERY_USER);
  

  useEffect(() => {
    if (data && data.user) {
      dispatch({ type: USER_PROFILE, payload: data.user })
    }
  }, [data]);

  return (
    <div id="profile-page" >
   
      {loading && (
        <h2 className="loading-data">
          Loading user data...
        </h2>
      )}
       
     {user?.profile && (
      <div>
     <Container >
      <Row >
        <Col className='d-flex align-items-center'><h3 >Username</h3></Col>
        <Col className='d-flex align-items-center'><h3>Followers</h3></Col>
        <Col className='d-flex align-items-center'><h3>Following</h3></Col>
        <Col ><Navbar><Navbar.Text className='fs-3 '><a className=" text-decoration-none" href="/">Generate Workout</a></Navbar.Text></Navbar></Col>
      </Row>
       </Container>
       <Container>
        <Row> 
         <Col></Col>
         <Col lg={10} className='border'>
          <ActivityFeed />
          </Col>
         <Col></Col>
        </Row>
       </Container>

     </div>
      )
    }
   
    </div>


  );
};

