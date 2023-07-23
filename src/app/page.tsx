"use client";

import NavBar from "@/components/NavBar";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import ChartCard from "@/components/ChartCard";
import React, {useEffect} from "react";
import TradingPeriod from "@/components/TradingPeriod";
import {ArcElement, CategoryScale, Chart, Filler, LinearScale, LineElement, PointElement} from "chart.js";


export default function Home() {
    Chart.register(LinearScale, CategoryScale, ArcElement, PointElement, LineElement, Filler);

    /**
     * Handles the resize of the window.
     */
    function handleResize() {
        for (let instancesKey in Chart.instances) {
            const chart = Chart.instances[instancesKey];

            chart.resize();
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <>
            <NavBar/>
            <main className="flex flex-col flex-1 px-5 md:px-[3rem] lg:px-[5rem] py-2.5 md:py-[2.5rem] lg:py-[3rem]">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-normal">
                        Metrics
                    </h1>
                    <div className="flex items-center gap-5">
                        <Label
                            className="font-medium"
                        >
                            Period:
                        </Label>
                        <Select>
                            <SelectTrigger
                                className="w-[150px] h-[40px] bg-[rgba(255,255,255,.05)] rounded-md"
                                value="all-time"
                            >
                                <SelectValue placeholder={"Select Period"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-time">
                                    All Time
                                </SelectItem>
                                <SelectItem value="30-d">
                                    Last 30 Days
                                </SelectItem>
                                <SelectItem value="7-d">
                                    Last 7 Days
                                </SelectItem>
                                <SelectItem value="1-d">
                                    Last 24 Hours
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-10">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <ChartCard
                                firstSubjectTitle="Balance"
                                firstSubjectValue="$5,664.56"
                                firstSubjectPercentage={"+6.2k%"}
                                secondSubjectTitle="Highest Balance"
                                secondSubjectValue="$5,664.56"
                                showChart={true}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <ChartCard
                                firstSubjectTitle="Profit"
                                firstSubjectValue="$9,516.97"
                                firstSubjectPercentage={"+2.41%"}
                                secondSubjectTitle="Fees"
                                secondSubjectValue="-$832.61"
                                showChart={true}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <ChartCard
                                firstSubjectTitle="Deposits"
                                firstSubjectValue="$500.41"
                                secondSubjectTitle="Last Transaction"
                                secondSubjectValue="+$150.41"
                                showChart={false}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <ChartCard
                                firstSubjectTitle="Withdrawals"
                                firstSubjectValue="$4,352.41"
                                secondSubjectTitle="Last Transaction"
                                secondSubjectValue="-$352.41"
                                showChart={false}
                            />
                        </div>
                        <div className="col-span-12">
                            <TradingPeriod/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

