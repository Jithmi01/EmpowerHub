import { useState } from "react";
import Header_bar from "../components/common/header_bar";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const UserLayout = ({ children }) => {
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
    getItem("Dashboard", "/", <DashboardIcon  style={{ fontSize: 20 }}/>),
    getItem("Donate Now", "/adsUserView", <VolunteerActivismIcon style={{ fontSize: 20 }}/>),
    getItem("My Donation", "/showDonation", <PersonIcon style={{ fontSize: 20 }}/> ),
    getItem("Job Portal", "/showVacancies", <WorkIcon style={{ fontSize: 20 }}/>),
    getItem("Applied Jobs", "/appliedJobs", <WorkHistoryIcon style={{ fontSize: 20 }}/>),
    getItem("Events", "/userEvent", <EmojiEventsIcon style={{ fontSize: 20 }}/>),
  ];

  return (
    <>
      <Header_bar />
      <Layout>
        <Sider className="sidebar"
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

      style{
        `
        .sidebar: paddingTop:20px
        `
      }
    </>
  );
};

export default UserLayout;
