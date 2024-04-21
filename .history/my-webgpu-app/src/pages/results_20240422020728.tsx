import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';

interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Results(props: resultsProps) {
    const [data, setData] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);

    useEffect(() => {
        Papa.parse('/public/result.csv', {
            download: true,
            header: true,
            complete: function(results: { data: never[]; }) {
                // Assuming the CSV file has 'Load3DModel' and 'FPS' columns
                const labels = results.data.map((row: never) => row['Technology']);
                const data = results.data.map((row: never) => row['Loading_Time_(s)']);
                setData({
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

    return (
        <section {...props}>
            <h1>Results</h1>
            {data && <Line data={data} />}
        </section>
    );
}