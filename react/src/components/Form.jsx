import { useState } from "react";

const Form = (props) => {
    const [sockData, setSockData] = useState({
        userId: "",
        size: "Small",
        color: "",
        pattern: "",
        material: "",
        condition: "Used",
        forFoot: "Left",
        waterResistant: false,
        padded: false,
        antiBacterial: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSockData((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create the data in the desired structure
        const formattedData = {
          userId: sockData.userId,
          sockDetails: {
            size: sockData.size,
            color: sockData.color,
            pattern: sockData.pattern,
            material: sockData.material,
            condition: sockData.condition,
            forFoot: sockData.forFoot,
          },
          additionalFeatures: {
            waterResistant: sockData.waterResistant,
            padded: sockData.padded,
            antiBacterial: sockData.antiBacterial,
          },
          addedTimestamp: new Date().toISOString(), // Adding current timestamp
        };
    
        // Pass formatted data to the parent
        props.handleAddSock(formattedData);
      };
    return (
        <form className="p-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input type="text" className="form-control" id="userId" name="userId" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="size">Size</label>
                <select
                    className="form-control"
                    id="size"
                    name="size"
                    value={sockData.size}
                    onChange={handleChange}
                >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    className="form-control"
                    id="color"
                    name="color" 
                    value={sockData.color}
                    onChange={handleChange}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="pattern">Pattern</label>
                <input
                    type="text"
                    className="form-control"
                    id="pattern"
                    name="pattern"
                    value={sockData.pattern}
                    onChange={handleChange}
                     />
            </div>
            <div className="form-group">
                <label htmlFor="material">Material</label>
                <input
                    type="text"
                    className="form-control"
                    id="material"
                    name="material" 
                    value={sockData.material}
                    onChange={handleChange}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                    className="form-control"
                    id="condition"
                    name="condition"
                    value={sockData.condition}
                    onChange={handleChange}
                >
                <option>Used</option>
                <option>New</option>
            </select>
        </div><div className="form-group">
                <label htmlFor="forFoot">For Foot</label>
                <select
                    className="form-control"
                    id="forFoot"
                    name="forFoot"
                    value={sockData.forFoot}
                    onChange={handleChange}
                >
                    <option>Left</option>
                    <option>Right</option>
                    <option>Both</option>
                </select>
            </div>
            <div className="row">
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="waterResistant"
                        name="waterResistant"
                        value={sockData.waterResistant}
                        onChange={handleChange}
                         />
                    <label className="form-check-label" htmlFor="waterResistant">
                        Water Resistant
                    </label>
                </div>
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="padded"
                        name="padded" 
                        value={sockData.padded}
                        onChange={handleChange}
                        />
                    <label className="form-check-label" htmlFor="padded">
                        Padded
                    </label>
                </div>
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="antiBacterial"
                        name="antiBacterial"
                        value={sockData.antiBacterial}
                        onChange={handleChange} />
                    <label className="form-check-label" htmlFor="antiBacterial">
                        Anti Bacterial
                    </label>
                </div>
                </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </form>
            )
        }

export default Form;