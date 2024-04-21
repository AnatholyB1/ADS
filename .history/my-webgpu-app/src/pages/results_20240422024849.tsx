/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';   
import Chart from 'chart.js/auto';

interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Results(props: resultsProps) {
    const [data, setData] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const chartRef = useRef(null);

    useEffect(() => {
        Papa.parse('/public/result.csv', {
            download: true,
            header: true,
            complete: function(results: { data: any[]; }) {
                const labels = results.data.map((row: any) => row[' Technology']);
                const data = results.data.map((row: any) => row[' Loading_Time_(s)']);
                setData({
                    labels,
                    datasets: [
                        {
                            label: 'Loading_Time_(s)',
                            data,
                            fill: true,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });
            }
        });
    }, []);

    useEffect(() => {
        if (chartRef.current && data) {
            new Chart(chartRef.current, {
                type: 'line',
                data: data,
            });
        }
    }, [data]);

    return (
        <section {...props}>
            <canvas ref={chartRef} />
        </section>
    );
}