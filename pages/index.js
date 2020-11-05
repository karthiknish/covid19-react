import React, { useEffect, useState } from "react";
import Cards from "../src/components/Cards/Cards";
import Chart from "../src/components/Chart/Chart";
import CountryPicker from "../src/components/CountryPicker/CountryPicker";
import styles from "./style.module.css";
import { Paper, Tooltip } from "@material-ui/core";
import { Brightness5, Brightness2 } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/core/styles";
import { fetchData } from "./api";
import lighttheme from "../src/lighttheme";
import darktheme from "../src/darktheme";
export default function Index() {
  const [data, setdata] = useState({});
  const [country, setcountry] = useState("");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    async function MainData() {
      setdata(await fetchData());
    }
    MainData();
  }, []);
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    isDark.matches ? setDark(true) : setDark(false);
  }, []);
  const handleCountryChange = async (country) => {
    const countryData = await fetchData(country);
    setdata(countryData);
    setcountry(country);
  };
  return (
    <ThemeProvider theme={dark ? darktheme : lighttheme}>
      {/* <div className={styles.container}> */}
      <Paper
        square
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "baseline" }}>
          <img
            className={styles.image}
            src={`/images/${dark ? "coviddark.png" : "covid.png"}`}
            alt="covid"
          />
          {dark ? (
            <Tooltip title="Change to light theme">
              <Brightness2
                onClick={() => setDark(false)}
                style={{ fontSize: "4em", cursor: "pointer" }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Change to light theme">
              <Brightness5
                onClick={() => setDark(true)}
                style={{ color: "#f8a500", fontSize: "4em", cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </div>
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart dark={dark} data={data} country={country} />
      </Paper>
      {/* </div> */}
    </ThemeProvider>
  );
}
