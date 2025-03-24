import { useState } from "react";

const Market = () => {
    // States to manage quantities and checkbox selections
    const [quantities, setQuantities] = useState({ AAPL: 100, GOOGL: 50, AMZN: 75 });
    const [selected, setSelected] = useState({ AAPL: false, GOOGL: false, AMZN: false });

    // Function to handle "Execute Trade" button click
    const handleExecuteTrade = () => {
        // Array to collect information for the dialog box
        const trades = Object.keys(selected)
            .filter(stock => selected[stock]) // Only include stocks that are selected
            .map(stock => {
                const price = stock === "AAPL" ? 218.27 : stock === "GOOGL" ? 166.25 : 196.21;
                return `${stock}: Quantity ${quantities[stock]}, Price $${price}`;
            });

        // Construct the dialog message
        const message = trades.length
            ? `Trade Processed!\n\n${trades.join("\n")}`
            : "No stocks were selected for trade.";

        alert(message);
    };

    // Function to handle "Clear" button click
    const handleClear = () => {
        setQuantities({ AAPL: "", GOOGL: "", AMZN: ""});
        setSelected({ AAPL: false, GOOGL: false, AMZN: false });
    };

    return (
        <>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(quantities).map(stock => (
                        <tr key={stock}>
                            <td>{stock}</td>
                            <td>{`$${stock === "AAPL" ? 218.27 : stock === "GOOGL" ? 166.25 : 196.21}`}</td>
                            <td>
                                <input
                                    type="number"
                                    value={quantities[stock]}
                                    min="0"
                                    onChange={(e) =>
                                        setQuantities({ ...quantities, [stock]: Number(e.target.value) })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selected[stock]}
                                    onChange={(e) =>
                                        setSelected({ ...selected, [stock]: e.target.checked })
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "20px" }}>
                <button onClick={handleExecuteTrade}>Execute Trade</button>
                <button onClick={handleClear} style={{ marginLeft: "10px" }}>Clear</button>
            </div>
        </>
    );
};

export default Market;
