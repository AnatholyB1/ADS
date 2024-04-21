/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';   
import Chart from 'chart.js/auto';

interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Results(props: resultsProps) {
    const [dataLoadingTime, setDataLoadingTime] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const chartRefLoadingTime = useRef(null);



    useEffect(() => {
        Papa.parse('/public/result.csv', {
            download: true,
            header: true,
            complete: function(results: { data: any[]; }) {
                const labels = [...new Set(results.data.map((row: any) => row[' Technology']))];
                const groupedData = results.data.reduce((acc: any, row: any, index: number) => {
                    const groupIndex = Math.floor(index / 3);
                    if (!acc[groupIndex]) {
                        acc[groupIndex] = [];
                    }
                    acc[groupIndex].push(row[' Loading_Time_(s)']);
                    return acc;
                }, []);
                const data = groupedData.map((group: number[]) => group.reduce((a: number, b: number) => a + b, 0) / group.length);

                setDataLoadingTime({
                    labels,
                    datasets: [
                        {
                            label: 'Loading_Time_(s)',
                            data,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });
            }
        });
    }, []);

    useEffect(() => {
        if (chartRefLoadingTime.current && dataLoadingTime) {
            new Chart(chartRefLoadingTime.current, {
                type: 'line',
                data: dataLoadingTime,
            });
        }
    }, [dataLoadingTime]);

    return (
        <section className="p-4 grid place-items-center gap-4" {...props}>
            <canvas  ref={chartRefLoadingTime} />


        </section>
    );
}