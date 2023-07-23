"use client";

import {useEffect, useState} from "react";
import {ArcElement, CategoryScale, Chart, Filler, LinearScale, LineElement, PointElement} from "chart.js";
import {Line} from "react-chartjs-2";

export default function TradingPeriodChart() {
    Chart.register(LinearScale, CategoryScale, ArcElement, PointElement, LineElement, Filler);
    const [data, setData] = useState<number[]>(Array.from({length: 50}).map((_, index) => {
        // Calculate some smooth up & down data
        const offset = Math.sin(index / 3) * 30 + Math.sin(index / 5) * 20;
        return offset + 50 + Math.random() * 10;
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            // Remove first element of data & generate new one
            setData((prev) => {
                const newData = [...prev];
                newData.shift();
                newData.push(prev[prev.length - 1] + Math.random() * 10 - 5);
                return newData;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="flex flex-col w-full relative">
            <Line
                className="w-full h-full max-h-[20rem]"
                data={{
                    datasets: [
                        {
                            data: data,
                            borderColor: (context) => {
                                // Linear gradient -> right
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                if (!chartArea) {
                                    // This case happens on initial chart load
                                    return "rgba(255,255,255,.01)";
                                }

                                const gradient = ctx.createLinearGradient(
                                    chartArea.right,
                                    chartArea.top,
                                    chartArea.left,
                                    chartArea.bottom
                                );

                                gradient.addColorStop(1, "#A6A6FF");
                                gradient.addColorStop(0, "#5855D6");

                                return gradient;
                            },
                            backgroundColor: (context) => {
                                // Linear gradient -> right
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                if (!chartArea) {
                                    // This case happens on initial chart load
                                    return "rgba(255,255,255,.01)";
                                }

                                //A6A6FF -> transparent from top -> bottom
                                const gradient = ctx.createLinearGradient(
                                    chartArea.left,
                                    chartArea.top,
                                    chartArea.left,
                                    chartArea.bottom
                                );

                                gradient.addColorStop(.5, "rgba(255,255,255,.05)");
                                gradient.addColorStop(1, "transparent");


                                return gradient;
                            },
                            pointRadius: 0,
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true,
                        }
                    ],
                    labels: data.map((_, index) => {
                        // Random date (E.g: Mar 5, Sep 12, etc)
                        const date = new Date();
                        date.setDate(date.getDate() + index);
                        return date.toLocaleDateString("en-US", {month: "short", day: "numeric"});
                    })
                }}
                options={{
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                        }
                    }
                }}
            />
        </div>
    )
}