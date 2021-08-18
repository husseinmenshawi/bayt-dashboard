import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/NavBar";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

import { users } from "./dummyData/users";
import { countries } from "./dummyData/countries";
import { lorem } from "./constant/lorem";

function App() {
  const [selectedDataSetId, setSelectedDataSetId] = useState(1);
  const [countriesState, setCountriesState] = useState(countries);
  const [usersState, setUsersState] = useState(users);
  const [selectedCountryId, setSelectedCountryId] = useState(-1);
  const [selectedWidgetId, setSelectedWidgetId] = useState(1);

  // useEffect(() => {
  //   if (countriesState.length == 0) {
  //     const targetCountries = countries.filter((x) => {
  //       return x.dataSetId == selectedDataSetId;
  //     });
  //     setCountriesState(targetCountries);
  //   }
  // }, []);

  const widgetTypes = [
    {
      value: "Bar Chart",
      label: "Bar Chart",
      id: 1,
    },
    {
      value: "Pie Chart",
      label: "Pie Chart",
      id: 2,
    },
  ];

  const dataSets = [
    {
      value: "Data Set One",
      label: "Data Set One",
      id: 1,
    },
    {
      value: "Data Set Two",
      label: "Data Set Two",
      id: 2,
    },
  ];

  const countriesList = countries.map((country) => {
    return {
      value: country.country,
      label: country.country,
      id: country.id,
    };
  });
  countriesList.unshift({
    value: "All",
    label: "All",
    id: -1,
  });

  const onCountryChange = (selectedCountry) => {
    setSelectedCountryId(selectedCountry.id);
  };

  const onWidgetTypeChange = (selectedWidget) => {
    setSelectedWidgetId(selectedWidget.id);
  };

  const onDataSetChange = (selectedDataSet) => {
    setSelectedDataSetId(selectedDataSet.id);
  };

  useEffect(() => {
    if (selectedCountryId == -1) {
      const targetUsers = users.filter((x) => {
        return x.dataSetId == selectedDataSetId;
      });
      setCountriesState(countries);
      setUsersState(targetUsers);
    } else {
      const filteredCountries = countries.filter((country) => {
        return country.id == selectedCountryId;
      });
      const filteredUsers = users.filter((user) => {
        return (
          user.countryId == selectedCountryId &&
          user.dataSetId == selectedDataSetId
        );
      });
      setCountriesState(filteredCountries);
      setUsersState(filteredUsers);
    }
  }, [selectedCountryId]);

  useEffect(() => {
    const filteredCountries = countries.filter((country) => {
      return country.dataSetId == selectedDataSetId;
    });
    const filteredUsers = users.filter((user) => {
      return user.dataSetId == selectedDataSetId;
    });
    setSelectedCountryId(-1);
    setCountriesState(filteredCountries);
    setUsersState(filteredUsers);
  }, [selectedDataSetId]);

  return (
    <div style={{ height: "1000px", background: "#eaeaea" }}>
      <NavBar />
      <Container style={{ paddingTop: "30px" }}>
        <Row style={{ paddingBottom: "20px" }}>
          <Col xs={12} md={12} lg={12}>
            <Card>
              <Card.Body>
                <Card.Title>Welcome back!</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Al Bayt Admin
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <Card
              style={{
                minWidth: "100%",
                padding: "10px",
                marginBottom: "30px",
              }}
            >
              <Card.Body>
                <Card.Title>Data Set:</Card.Title>
                <Select
                  options={dataSets}
                  onChange={onDataSetChange}
                  placeholder={"Select Data Set"}
                  value={dataSets.filter((x) => {
                    return x.id == selectedDataSetId;
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </Card.Body>
            </Card>
            <Card
              style={{
                minWidth: "100%",
                padding: "10px",
                marginBottom: "30px",
              }}
            >
              <Card.Body>
                <Card.Title>Widget Type:</Card.Title>
                <Select
                  options={widgetTypes}
                  onChange={onWidgetTypeChange}
                  placeholder={"Select Widget Type"}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </Card.Body>
            </Card>
            <Card
              style={{
                minWidth: "100%",
                padding: "10px",
                marginBottom: "30px",
              }}
            >
              <Card.Body>
                <Card.Title>Total Regions:</Card.Title>
                <Card.Text style={{ fontSize: "20px" }}>
                  {countries.length}
                </Card.Text>
                <Select
                  options={countriesList}
                  onChange={onCountryChange}
                  placeholder={"Select Country"}
                  value={countriesList.filter((x) => {
                    return x.id == selectedCountryId;
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </Card.Body>
            </Card>
            <Card
              style={{
                minWidth: "100%",
                padding: "10px",
                // marginBottom: "30px",
              }}
            >
              <Card.Body>
                <Card.Title>Total Users:</Card.Title>
                <Card.Text style={{ fontSize: "20px" }}>
                  {usersState.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            lg={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              style={{ minWidth: "100%", minHeight: "500px", padding: "20px" }}
            >
              <Card.Body>
                <Card.Title>User Regions</Card.Title>
                {selectedWidgetId == 1 ? (
                  <BarChart
                    data={countriesState}
                    xDataKey={"country"}
                    yDataKey={"numberOfUsers"}
                  />
                ) : (
                  ""
                )}
                {selectedWidgetId == 2 ? (
                  <PieChart data={countriesState} label={"Users"} />
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            lg={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              style={{ minWidth: "100%", minHeight: "500px", padding: "20px" }}
            >
              <Card.Body>
                <Card.Title>User Sales</Card.Title>
                {selectedWidgetId == 1 ? (
                  <BarChart
                    data={usersState}
                    xDataKey={"name"}
                    yDataKey={"sale"}
                    color={"#00488f"}
                  />
                ) : (
                  ""
                )}

                {selectedWidgetId == 2 ? (
                  <PieChart
                    data={usersState}
                    color={"#00488f"}
                    label={"Sales"}
                  />
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
