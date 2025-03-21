import React from "react";
import { AutoComplete, Card, Carousel, Col, Row } from "antd";
import logo from "../../assets/images/3d.jpg";
import slider2 from "../../assets/images/c3.jpg";
import slider3 from "../../assets/images/2d.jpeg";
import slider4 from "../../assets/images/c1.jpg";
import slider5 from "../../assets/images/c2.jpg";
import do2 from "../../assets/images/do2.jpg";
import do3 from "../../assets/images/nowater.jpg";
import do4 from "../../assets/images/hand.jpg";
import do5 from "../../assets/images/login.gif";

const contentStyle = {
  height: "60px",
  widith: "250px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Home = () => {
  return (
    <div>
      <div style={{ paddingLeft: 250, marginTop: "50px" }}>
        <Carousel autoplay>
          <div>
            <img src={slider2} style={{ height: 500 }} />
          </div>
          <div>
            <img src={slider3} style={{ height: 500 }} />
          </div>
          <div>
            <img src={slider4} style={{ height: 500 }} />
          </div>
          <div>
            <img src={slider5} style={{ height: 500 }} />
          </div>
        </Carousel>
        <br></br>
        <br></br>
      </div>
      <div>
        <Card style={{ boxShadow: "10px 5px 5px 10px lightblue" }}>
          <Row>
            <Col span={1} />
            <Card style={{ backgroundColor: "#EBDEF0" }}>
              <h2
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Donation
              </h2>
              <img
                src={logo}
                style={{ height: 150, width: 250, borderRadius: 5 }}
              />
              <h3
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                One of the best ways you <br></br>can make a different in the
                lives <br></br>of these peopleis to make a financial<br></br>{" "}
                donation to our work.
              </h3>
            </Card>

            <Card style={{ backgroundColor: "#EBDEF0" }}>
              <h1
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                "Alone we can do little things <br></br>together we can do so
                much"
              </h1>
              <img
                src={do2}
                style={{ height: 350, width: 400, borderRadius: 5 }}
              />
            </Card>

            <Card style={{ backgroundColor: "#EBDEF0" }}>
              <img
                src={do3}
                style={{ height: 200, width: 300, borderRadius: 5 }}
              />
              <h3
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                The open sources are susceptible to drying up,
                <br></br>contamination and hence the poor quality of .<br></br>
                water These children also faced a bigger risk of <br></br>
                shortage of water.{" "}
              </h3>
            </Card>
          </Row>
        </Card>
      </div>
      <div>
        <Card >
          <Row>
            <Col span={1} />
            <Card style={{}}>
              <h2
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                {" "}
                </h2>
              <img
                src={do4}
                style={{ height: 250, width: 350, borderRadius: 5 }}
              />
              <h3
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                People with lower incomes tend to give a greater <br></br> percentage of their incomes to
                 help others and show greater <br></br> empathy and compassion – <br></br> perhaps because they know they might face
                 <br></br> the same circumstances.
               
              </h3>
            </Card>
            <Col span={5} />

            <Card>
              <h1
                style={{
                  fontWeight: "normal",
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                Help others achieve their dreams and <br></br> you will achieve yours.
― Les Brown
              </h1>
              <img
                src={do5}
                style={{ height: 250, width: 400, borderRadius: 5 }}
              />
            </Card>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Home;
