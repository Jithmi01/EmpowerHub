import React, { useState, useEffect } from "react";
import { Card, Collapse } from "antd";
import axios from "axios";
import PageWithTitleSearch from "../common/PageWithTitleSearch";

const Applied = () => {
  const [appliedList, setAppliedList] = useState([]);
  const [searchText, setSearchText] = useState("");

  function getAllAppliedJobs() {
    axios
      .get("http://localhost:4000/jobHire/")
      .then((res) => {
        setAppliedList(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  useEffect(() => {
    getAllAppliedJobs();
  }, []);

  const { Panel } = Collapse;

  return (
    <PageWithTitleSearch
      hasSearch={true}
      title={"Applied Job Details"}
      onSearch={setSearchText}
    >
      {appliedList
        ?.filter((val) => {
          if (setSearchText === " ") {
            return val;
          } else if (
            val.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
            val.location.toLowerCase().includes(searchText.toLowerCase()) ||
            val.company.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return val;
          }
        })
        .map((appliedtDetailsVal) => (
          <div className="event_main">
            <Collapse accordion expandIconPosition="right">
              <Panel
                header={
                  <div style={{ fontWeight: "bold" }}>
                    {appliedtDetailsVal.company +
                      " - " +
                      appliedtDetailsVal.jobTitle}
                  </div>
                }
              >
                <Card
                  style={{
                    width: "100%",
                  }}
                  title="Job Title"
                >
                  {appliedtDetailsVal.jobTitle}
                </Card>
                <Card
                  style={{
                    width: "100%",
                  }}
                  title="Company"
                >
                  {appliedtDetailsVal.company}
                </Card>
                <Card
                  style={{
                    width: "100%",
                  }}
                  title="Location"
                >
                  {appliedtDetailsVal.location}
                </Card>
                <Card
                  style={{
                    width: "100%",
                  }}
                  title="Opening Date"
                >
                  {appliedtDetailsVal.openingDate}
                </Card>
                <Card
                  style={{
                    width: "100%",
                  }}
                  title="Closing Date"
                >
                  {appliedtDetailsVal.closingDate}
                </Card>
              </Panel>
            </Collapse>
          </div>
        ))}
    </PageWithTitleSearch>
  );
};
export default Applied;
