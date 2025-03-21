import { Layout, Menu } from "antd";
import React, { useState } from "react";

import {
  BankTwoTone,
  CarFilled,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Ads from "../DonationAdmin/ShowAllAds";
import AllEvent from "../Event/Admin/AllEvent";
import Financial from "../Financial/Financial";
import Header_bar from "../common/header_bar";

import Admin from "../../pages/AdminDashboard/Admin_dashboard";
import JobList from "../JobPortal/JobList";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = (props) => {
  const { opennav, open } = props;

  function getItem(label, key, icon) {
    return {
      key,
      label,
      icon,
      onClick: () => {
        setActiveIndex(key);
      },
    };
  }

  const items = [
    getItem("Dashboard", 0, <BankTwoTone />),
    getItem("Donation", 1, <UserOutlined />),
    getItem("Job Portal", 2, <CarFilled />),
    getItem("Events", 3, <LineChartOutlined />),
    getItem("Financial", 4, <LineChartOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const bodyContainer = [
    <Admin />,
    <Ads />,
    <JobList />,
    <AllEvent />,
    <Financial />,
  ];

  return (
    <>
      <div>
        <Header_bar />

        <Layout style={{ minHeight: "180vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                color: "white",
                fontSize: 20,
              }}
            >
              Welcome to <br></br>Admin Menu
            </div>

            <Menu
              theme="dark"
              defaultSelectedKeys={["0"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: "0 16px" }}>
              {bodyContainer[activeIndex]}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              NoPoverty System ©2023
            </Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Dashboard;
