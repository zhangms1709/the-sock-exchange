import Promo from "./Promo";

const Featured = (props) => {
    return (
        <div className="card-container d-flex flex-row justify-content-start" style={{
            gap: "20px", padding: "20px"
        }}>
            {
                props.data.map((p) => (
                    <Promo key={p.id} data={p} />
                ))
            }
        </div>
    );
};

export default Featured;