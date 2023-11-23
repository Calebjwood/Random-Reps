import { useQuery } from "@apollo/client";

import { QUERY_USER } from "../../utils/queries";

import { Container, Row, Col, Navbar } from "react-bootstrap";
import ActivityFeed from "../../components/ActivityFeed";
import "./style.scss";

export default function Profile() {
  const { data, loading } = useQuery(QUERY_USER);

  console.log(data);

  return (
    <div id="profile-page">
      {loading && <h2 className="loading-data">Loading user data...</h2>}

      {data?.user && (
        <div>
          <Container>
            <Row>
              <Col className="d-flex align-items-center">
                <h3>{data.user.username}</h3>
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
                    <a className=" text-decoration-none" href="/">
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
                  workouts={data.user.savedWorkouts}
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
