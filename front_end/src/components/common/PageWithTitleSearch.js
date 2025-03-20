import { Col, Row } from "antd";
import WrapperCard from "./Wrapper_card";
import Search from "antd/es/input/Search";

const PageWithTitleSearch = ({ title, hasSearch, children, onSearch }) => {
  return (
    <div className="pg-main-container">
      <div className="pg-sub-container">
        <WrapperCard
          style={{
            backgroundColor: "#37475E",
          }}
        >
          <Row
            style={{
              alignItems: "center",
              padding: "16px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Col>
              <h1 style={{ color: "White" }}>{title}</h1>
            </Col>
            {hasSearch == true && (
              <Col>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="middle"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </Col>
            )}
          </Row>
        </WrapperCard>
        <div
          style={{
            height: "calc(100vh - 220px)",
            paddingTop: "10px",
            paddingBottom: "10px",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWithTitleSearch;
