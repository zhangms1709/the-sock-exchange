import React from 'react';
const Sock = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Sock Details</h5>
                <div className="card-text">Size: </div>
                <div className="card-text">Color: </div>
                <div className="card-text">Pattern: </div>
                <div className="card-text">Material: </div>
                <div className="card-text">Condition: </div>
                <div className="card-text">For Foot: </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">Additional Features</h5>
                <div className="card-text">Water Resistant: </div>
                <div className="card-text">Padded: </div>
                <div className="card-text">Anti Bacterial: </div>
            </div>
            <div className="card-footer" >
                <small className="text-muted">Added: </small>
            </div>
        </div>
    );
};
export default Sock;