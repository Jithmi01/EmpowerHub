import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Card, Button, Row, Col, Typography } from "antd";
import "../../assets/styles/adsUserView.css";
import WrapperCard from "../common/Wrapper_card";

const { Title, Text } = Typography;

const AdsUserView = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/adDonations/")
      .then((res) => setAds(res.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="ads-container">
      <WrapperCard style={{ backgroundColor: "#37475E", height:'70px',borderRadius: 5, color:'white',fontSize:'30px',margin:'5px',paddingTop:'10px',fontWeight:'bold',}}>
        Donation Opportunities
      </WrapperCard>

      <Row gutter={[16, 16]} justify="center" >
        {ads.map((ad, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
  <Card
              hoverable
              className="ad-card"
              style={{
                backgroundColor: "#DEEBF5", // Light grey background
                borderRadius: "10px",
                padding: "15px",
              }}
            >              <Title level={4} className="ad-name">
                {ad.name} <span className="small-desc">({ad.smallDes})</span>
              </Title>

              <p className="location">
                <EnvironmentOutlined /> <Text strong>{ad.location}</Text>
              </p>

              <Text className="help-required">Help Required:</Text>
              <Text className="help-text">{ad.help}</Text>

              <p className="long-desc">{ad.longDes}</p>

              <Link to={`/donate?name=${encodeURIComponent(ad.name)}`}>
                <Button type="primary" className="donate-btn">
                  Donate
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdsUserView;
