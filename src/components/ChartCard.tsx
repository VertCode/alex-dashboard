import {BiDotsHorizontalRounded} from "react-icons/bi";
import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";

interface ChartCartProps {
    firstSubjectTitle: string;
    firstSubjectValue: string;
    firstSubjectPercentage?: string | undefined;

    secondSubjectTitle: string;
    secondSubjectValue: string;

    showChart?: boolean;
}

export default function ChartCard(
    {
        firstSubjectTitle,
        firstSubjectValue,
        firstSubjectPercentage,
        secondSubjectTitle,
        secondSubjectValue,
        showChart = true
    }: ChartCartProps
) {
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
        <div className="w-full backdrop-blur rounded-md p-5 border border-[rgba(255,255,255,.05)] h-full" style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 6px 12px rgba(0,0,0,.05)",
            background: "radial-gradient(75% 75% at 25% 15%,rgba(255,255,255,.01) 0,rgba(255,255,255,.03) 100%)",
        }}>
            <div className="w-full flex justify-between text-[rgba(255,255,255,.55)]">
                <h4>
                    {firstSubjectTitle}
                </h4>
                <BiDotsHorizontalRounded
                    className="h-5 w-5 text-[rgba(255,255,255,.5)]"
                />
            </div>
            <div className="flex py-4">
                <h2 className="text-3xl font-medium">
                    {
                        firstSubjectValue.split(".")[0]
                    }<span className="text-[rgba(255,255,255,.3)]">.{firstSubjectValue.split(".")[1]}</span>
                </h2>
                {
                    firstSubjectPercentage && (
                        <h3 className="text-green-400 self-end ml-3 font-normal">
                            {
                                firstSubjectPercentage
                            }
                        </h3>
                    )
                }
            </div>
            <div className="flex flex-wrap gap-y-5">
                <div className="flex flex-col w-full xl:w-1/2 gap-2.5">
                    <h4 className="text-[rgba(255,255,255,.55)]">
                        {
                            secondSubjectTitle
                        }
                    </h4>
                    <h2 className="text-xl font-normal">
                        {
                            secondSubjectValue.split(".")[0]
                        }<span className="text-[rgba(255,255,255,.3)]">.{secondSubjectValue.split(".")[1]}</span>
                    </h2>
                </div>
                {
                    showChart && (
                        <div className="flex flex-col w-full xl:w-1/2 relative">
                            <Line
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
                                            backgroundColor: "rgba(255,255,255,.01)",
                                            pointRadius: 0,
                                            borderWidth: 2,
                                            tension: 0.4,
                                            fill: true,
                                        }
                                    ],
                                    labels: data.map((_, index) => {
                                        return index;
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
                                            display: false
                                        },
                                        y: {
                                            display: false
                                        }
                                    }
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}