/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';   
import { Chart, CategoryScale, LinearScale , BarElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';


Chart.register(CategoryScale, LinearScale, BarElement);

interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Results(props: resultsProps) {
    const [dataLoadingTime, setDataLoadingTime] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const [dataLoadingTimePerType, setDataLoadingTimePerType] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const [dataFPSPerTechnology, setDataFPSPerTechnology] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const [dataMemoryPerTechnology, setDataMemoryPerTechnology] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    



    useEffect(() => {
        Papa.parse('/result.csv', {
            download: true,
            header: true,
            complete: function(results: { data: any[]; }) {

                const labels = [...new Set(results.data.filter((row: any) => row[' Technology']).map((row: any) => row[' Technology']))];
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


                const labelsPerType = [...new Set(results.data.filter((row: any) => row[' Model_Type']).map((row: any) => row[' Model_Type']))];
                const dataPerType = results.data.filter((row: any) => row[' Technology'] === ' Babylon.js with WebGPU').map((row: any) => parseFloat(row[' Loading_Time_(s)']));
                

                setDataLoadingTimePerType({
                    labels: labelsPerType,
                    datasets: [
                        {
                            label: 'Loading Time(s) for babylon.js with WebGPU',
                            data: dataPerType,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });

                const groupedDataFPS = results.data.reduce((acc: any, row: any, index: number) => {
                    const groupIndex = Math.floor(index / 3);
                    if (!acc[groupIndex]) {
                        acc[groupIndex] = [];
                    }
                    acc[groupIndex].push(parseFloat(row[' Average_FPS']));
                    return acc;
                }, []);
                const dataFPS = groupedDataFPS.map((group: number[]) => group.reduce((a: number, b: number) => a + b, 0) / group.length);


                setDataFPSPerTechnology({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average FPS per Technology',
                            data: dataFPS,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });


                const groupedDataMemory = results.data.reduce((acc: any, row: any, index: number) => {
                    const groupIndex = Math.floor(index / 3);
                    if (!acc[groupIndex]) {
                        acc[groupIndex] = [];
                    }
                    acc[groupIndex].push(parseFloat(row[' Peak_Memor__Usage (MB)']));
                    return acc;
                }, []);

                const dataMemory = groupedDataMemory.map((group: number[]) => group.reduce((a: number, b: number) => a + b, 0) / group.length);

                setDataMemoryPerTechnology({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Memory Usage per Technology',
                            data: dataMemory,
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
        <section className="p-4 grid place-items-center gap-4 grid-flow-row-dense " {...props}>
            {dataLoadingTime && <Bar  data={dataLoadingTime} options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Loading Time per Technology'
                    }
                }
            }} />}
            {dataLoadingTimePerType && <Bar  data={dataLoadingTimePerType} options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Loading Time per Type'
                    }
                }
            }} />}
            {dataFPSPerTechnology && <Bar  data={dataFPSPerTechnology} options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'FPS per Technology'
                    }
                }
            }} />}
            {dataMemoryPerTechnology && <Bar  data={dataMemoryPerTechnology} options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Memory Usage per Technology'
                    }
                }
            }} />}
        </section>
    );
}