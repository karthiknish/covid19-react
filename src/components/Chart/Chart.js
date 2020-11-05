import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../../pages/api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
function Chart({ data: { confirmed, recovered, deaths }, country, dark }) {
  const [dailyData, setdailyData] = useState([]);
  useEffect(() => {
    const MainData = async () => {
      setdailyData(await fetchDailyData());
    };
    MainData();
  }, []);
  const lineChart =
    dailyData.length !== 0 ? (
      <Line
        className={styles.lineChart}
        options={{
          legend: {
            labels: {
              fontColor: dark ? "#fff" : "#000",
            },
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: dark ? "#fff" : "#000",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: dark ? "#fff" : "#000",
                },
              },
            ],
          },
        }}
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: {
          display: false,
          title: { display: true, text: `Current state in ${country}` },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: dark ? "#fff" : "#000",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: dark ? "#fff" : "#000",
              },
            },
          ],
        },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
}

export default Chart;
