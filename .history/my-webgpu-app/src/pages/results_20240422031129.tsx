/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';   
import { Bar } from 'react-chartjs-2';


interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Results(props: resultsProps) {
    const [dataLoadingTime, setDataLoadingTime] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const [dataLoadingTimePerType, setDataLoadingTimePerType] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);




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
                    acc[groupIndex].push(parseFloat(row[' Loading_Time_(s)']));
                    return acc;
                }, []);
                const data = groupedData.map((group: number[]) => group.reduce((a: number, b: number) => a + b, 0) / group.length);

                

                setDataLoadingTime({
                    labels,
                    datasets: [
                        {
                            label: 'Average Loading Time(s)',
                            data,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });

                const dataPerType = results.data.filter((row: any) => row[' Technology'] === ' WebGPU').map((row: any) => parseFloat(row[' Loading_Time_(s)']));

                setDataLoadingTimePerType({
                    labels: ['WebGPU'],
                    datasets: [
                        {
                            label: 'Loading Time(s)',
                            data: dataPerType,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });
            }
        });
    }, []);



    return (
        <section className="p-4 grid place-items-center gap-4 grid-flow-row-dense grid-cols-2" {...props}>
                   {dataLoadingTime && <Bar data={dataLoadingTime} />}
                   {dataLoadingTimePerType && <Bar data={dataLoadingTimePerType} />}

        </section>
    );
}