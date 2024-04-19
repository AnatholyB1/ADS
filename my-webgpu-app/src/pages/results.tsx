interface resultsProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}
export default function Results(props: resultsProps) {
    return (
        <section {...props}>
            <h1>results</h1>
        </section>
    );
}