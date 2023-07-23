import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AiOutlineBarChart, AiOutlineLineChart} from "react-icons/ai";
import {cn} from "@/utils/cn";
import React from "react";
import TradingPeriodChart from "@/components/TradingPeriodChart";

enum TradingPeriodChartType {

    GAIN = "gain",
    PROFILE = "profile",
    PIPS = "pips",
    WIN_PERCENTAGE = "win_%",
    TRADES = "trades",
    LOTS = "lots",

}

enum TradingPeriodChartTypeData {

    ONE_DAY = "1D",
    ONE_WEEK = "1W",
    ONE_MONTH = "1M",
    ONE_YEAR = "1Y",
    ALL_TIME = "ALL",

}

export default function TradingPeriod() {
    const [tradingPeriodChartType, setTradingPeriodChartType] = React.useState<"line" | "bars">("line");
    const [tradingPeriodChartTypeData, setTradingPeriodChartTypeData] = React.useState<TradingPeriodChartType>(TradingPeriodChartType.GAIN);
    const [tradingPeriodChartTypeDataData, setTradingPeriodChartTypeDataData] = React.useState<TradingPeriodChartTypeData>(TradingPeriodChartTypeData.ONE_DAY);

    return (
        <div
            className="flex flex-col gap-5 w-full backdrop-blur rounded-md p-5 border border-[rgba(255,255,255,.05)] h-full"
            style={{
                boxShadow: "0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 6px 12px rgba(0,0,0,.05)",
                background: "radial-gradient(75% 75% at 25% 15%,rgba(255,255,255,.01) 0,rgba(255,255,255,.03) 100%)",
            }}
        >
            <div className="w-full flex justify-between items-center">
                <h2 className="text-xl font-medium">
                    Trading Period
                </h2>
                <div className="flex items-center gap-5">
                    <h3>
                        Chart:
                    </h3>
                    <Tabs
                        defaultValue="line"
                        onValueChange={(value) => setTradingPeriodChartType(value as "line" | "bars")}
                    >
                        <TabsList>
                            <TabsTrigger value="line"
                                         className="data-[state=active]:bg-[rgba(255,255,255,.1)]">
                                <AiOutlineLineChart
                                    className="h-5 w-5"
                                />
                            </TabsTrigger>
                            <TabsTrigger value="bars"
                                         className="data-[state=active]:bg-[rgba(255,255,255,.1)]">
                                <AiOutlineBarChart
                                    className="h-5 w-5"
                                />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-5">
                    {
                        Object.values(TradingPeriodChartType).map((value) => (
                            <div
                                key={value}
                                className={cn({
                                    "capitalize text-[rgba(255,255,255,.55)] border-b-2 border-b-transparent pb-0.5 transition-all duration-200 cursor-pointer hover:border-b-[#5855D6] hover:text-white": true,
                                    "border-b-[#5855D6] text-white": tradingPeriodChartTypeData === value,
                                })}
                                onClick={() => setTradingPeriodChartTypeData(value)}
                            >
                                {
                                    value.replace("_", " ")
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="flex gap-5">
                    {
                        Object.values(TradingPeriodChartTypeData).map((value) => (
                            <div
                                key={value}
                                className={cn({
                                    "capitalize text-[rgba(255,255,255,.55)] border-b-2 border-b-transparent pb-0.5 transition-all duration-200 cursor-pointer hover:border-b-[#5855D6] hover:text-white": true,
                                    "border-b-[#5855D6] text-white": tradingPeriodChartTypeDataData === value,
                                })}
                                onClick={() => setTradingPeriodChartTypeDataData(value)}
                            >
                                {
                                    value.replace("_", " ")
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <TradingPeriodChart/>
        </div>
    );
}