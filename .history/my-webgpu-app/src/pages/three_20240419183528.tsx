

interface threeProps extends React.HTMLAttributes<HTMLDivElement> {
    // props
}
    
    
export default function Three(props: threeProps) {

    return (
        <section {...props}>
        <h1>three</h1>
        </section>
    );
    
}