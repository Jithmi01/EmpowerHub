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

  // Filter applied jobs based on the search text
  const filteredAppliedList = appliedList.filter((val) => {
    if (searchText.trim() === "") {
      return val;
    } else if (
      val.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      val.location.toLowerCase().includes(searchText.toLowerCase()) ||
      val.company.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return val;
    }
  });

  return (
    <PageWithTitleSearch
      hasSearch={true}
      title={"Applied Job Details"}
      onSearch={setSearchText}
    >
      <div style={{ backgroundColor: "#f0f8ff", padding: "20px" }}>
        {filteredAppliedList.map((appliedDetails) => (
          <div
            className="event_main"
            key={appliedDetails._id}
            style={{ marginBottom: "20px" }}
          >
            <Collapse accordion expandIconPosition="right">
              <Panel
                header={
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      color: "#001f3d", // Dark blue
                      textAlign: "center",
                      padding: "10px",
                      backgroundColor: "#001f3d", // Dark blue background
                      color: "white",
                      borderRadius: "5px",
                      marginBottom: "15px",
                    }}
                  >
                    {appliedDetails.company + " - " + appliedDetails.jobTitle}
                  </div>
                }
              >
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "#e6f7ff", // Light blue background
                  }}
                  title="Job Title"
                >
                  {appliedDetails.jobTitle}
                </Card>
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "#e6f7ff", // Light blue background
                  }}
                  title="Company"
                >
                  {appliedDetails.company}
                </Card>
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "#e6f7ff", // Light blue background
                  }}
                  title="Location"
                >
                  {appliedDetails.location}
                </Card>
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "#e6f7ff", // Light blue background
                  }}
                  title="Opening Date"
                >
                  {appliedDetails.openingDate}
                </Card>
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "#e6f7ff", // Light blue background
                  }}
                  title="Closing Date"
                >
                  {appliedDetails.closingDate}
                </Card>
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    </PageWithTitleSearch>
  );
};

export default Applied;