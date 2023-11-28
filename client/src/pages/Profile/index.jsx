import { Container, Row, Col, Navbar } from "react-bootstrap";
import ActivityFeed from "../../components/ActivityFeed";
import { useUserContext } from "../../utils/user-context";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../../utils/queries";


export default function Profile() {
  const { userId } = useParams();
  const { me, loading } = useUserContext();
  let user = me;
  
  let isLoading = loading


  if (userId) {
    const { data, loading } = useQuery(QUERY_SINGLE_USER, {
      variables: { userId },
    })
    isLoading = loading
    user = data?.user;
   
  }

  return (
    <div id="profile-page">
      {(isLoading ) && (
        <h2 className="loading-data">Loading user data...</h2>
      )}

      {!isLoading && (
        <div>
          <Container>
            <Row>
              <Col className="d-flex align-items-center">
                <h3>{user.username}</h3>
              </Col>
              <Col className="d-flex align-items-center">
                <h3>Followers</h3>
              </Col>
              <Col className="d-flex align-items-center">
                <h3>Following</h3>
              </Col>
              <Col>
                <Navbar>
                  <Navbar.Text className="fs-3 ">
                    <a className=" text-decoration-none" href="/settings">
                      Generate Workout
                    </a>
                  </Navbar.Text>
                </Navbar>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col></Col>
              <Col lg={10} className="border">
                <ActivityFeed
                  workouts={user.savedWorkouts}
                  title="Activity Feed:"
                />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
