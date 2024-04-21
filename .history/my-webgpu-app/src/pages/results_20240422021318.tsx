import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';

interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Results(props: resultsProps) {
    const [data, setData] = useState<{ labels: string[], datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Papa.parse('/public/result.csv', {
            download: true,
            header: true,
            complete: function(results: { data: never[]; }) {
                const labels = results.data.map((row: never) => row['Technology']);
                const data = results.data.map((row: never) => row['Loading_Time_(s)']);
                console.log(labels, data);
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
                setLoading(false);
            }
        });
    }, []);

    return (
        <section {...props}>
            <h1>Results</h1>
            {loading ? <p>Loading...</p> : data && <Line data={data} />}
        </section>
    );
}