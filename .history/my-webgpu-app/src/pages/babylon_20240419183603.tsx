interface babylonProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}

export default function Babylon(props: babylonProps) {

    return (
        <section {...props}>
        <h1>babylon</h1>
        </section>
    );
    
}