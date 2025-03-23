import { useState } from "react";
import Header_bar from "../components/common/header_bar";
import { useLocation, useNavigate } from "react-router-dom";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function getItem(label, key, icon) {
    return {
      key,
      label,
      icon,
      onClick: () => {
        navigate(key);
      },
    };
  }

  const items = [
    getItem("Dashboard", "/dashboard", <DashboardIcon  style={{ fontSize: 20 }}/>),
    getItem("Advertisement", "/showAds", <VolunteerActivismIcon style={{ fontSize: 20 }}/>),
    getItem("Donation History", "/financial", <ManageHistoryIcon style={{ fontSize: 20 }}/> ),
    getItem("Job Portal", "/jobList", <WorkIcon style={{ fontSize: 20 }}/>),
    getItem("Events", "/allEvent", <EmojiEventsIcon style={{ fontSize: 20 }}/>),
  ];

  return (
    <>
      <Header_bar />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={location.pathname}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            EmpowerHub ©2025
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
