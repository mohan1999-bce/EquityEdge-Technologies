import { useState } from 'react';
import '../styles/market.css';

const Market = () => {
    const [stocks, setStocks] = useState([
        { ticker: 'MSFT', price: 320, quantity: '', selected: false },
        { ticker: 'GOOGL', price: 135, quantity: '', selected: false },
        { ticker: 'AMZN', price: 125, quantity: '', selected: false },
        { ticker: 'TSLA', price: 210, quantity: '', selected: false },
        { ticker: 'NVDA', price: 430, quantity: '', selected: false },
        { ticker: 'META', price: 300, quantity: '', selected: false },
        { ticker: 'BRK.B', price: 360, quantity: '', selected: false },
        { ticker: 'UNH', price: 490, quantity: '', selected: false },
        { ticker: 'JNJ', price: 160, quantity: '', selected: false },
        { ticker: 'V', price: 245, quantity: '', selected: false },
        { ticker: 'MA', price: 370, quantity: '', selected: false },
        { ticker: 'HD', price: 280, quantity: '', selected: false },
        { ticker: 'XOM', price: 105, quantity: '', selected: false },
        { ticker: 'KO', price: 58, quantity: '', selected: false },
        { ticker: 'PEP', price: 175, quantity: '', selected: false },
        { ticker: 'MRK', price: 115, quantity: '', selected: false },
        { ticker: 'ABBV', price: 150, quantity: '', selected: false },
        { ticker: 'WMT', price: 140, quantity: '', selected: false },
        { ticker: 'BAC', price: 29, quantity: '', selected: false },
        { ticker: 'DIS', price: 88, quantity: '', selected: false },
        { ticker: 'NFLX', price: 445, quantity: '', selected: false },
        { ticker: 'ORCL', price: 122, quantity: '', selected: false },
        { ticker: 'CSCO', price: 52, quantity: '', selected: false },
        { ticker: 'CRM', price: 212, quantity: '', selected: false },
        { ticker: 'PFE', price: 36, quantity: '', selected: false },
        { ticker: 'T', price: 17, quantity: '', selected: false },
        { ticker: 'INTC', price: 35, quantity: '', selected: false },
        { ticker: 'BMY', price: 65, quantity: '', selected: false },
        { ticker: 'COST', price: 540, quantity: '', selected: false },
        { ticker: 'CVX', price: 160, quantity: '', selected: false },
        { ticker: 'QCOM', price: 130, quantity: '', selected: false },
        { ticker: 'LMT', price: 460, quantity: '', selected: false },
        { ticker: 'MCD', price: 295, quantity: '', selected: false },
        { ticker: 'TMO', price: 500, quantity: '', selected: false },
        { ticker: 'UPS', price: 175, quantity: '', selected: false },
        { ticker: 'TXN', price: 175, quantity: '', selected: false },
        { ticker: 'NEE', price: 70, quantity: '', selected: false },
        { ticker: 'NKE', price: 105, quantity: '', selected: false },
        { ticker: 'GE', price: 115, quantity: '', selected: false },
        { ticker: 'GS', price: 365, quantity: '', selected: false },
        { ticker: 'BLK', price: 690, quantity: '', selected: false },
        { ticker: 'DHR', price: 245, quantity: '', selected: false },
        { ticker: 'ADBE', price: 520, quantity: '', selected: false },
        { ticker: 'AVGO', price: 890, quantity: '', selected: false },
        { ticker: 'AMD', price: 105, quantity: '', selected: false },
        { ticker: 'IBM', price: 140, quantity: '', selected: false },
        { ticker: 'PYPL', price: 60, quantity: '', selected: false },
        { ticker: 'SBUX', price: 95, quantity: '', selected: false },
        { ticker: 'DE', price: 400, quantity: '', selected: false }
    ]);
    const [selectedPortfolio] = useState(null);

    const handleInputChange = (index, event) => {
        const newStocks = [...stocks];
        newStocks[index][event.target.name] = event.target.value;
        setStocks(newStocks);
    };

    const handleCheckboxChange = (index) => {
        const newStocks = [...stocks];
        newStocks[index].selected = !newStocks[index].selected;
        setStocks(newStocks);
    };

    const handleSubmit = async () => {
    if (!selectedPortfolio) {
        toast.error('Please select a portfolio first');
        return;
    }

    const selectedStocks = stocks.filter(stock => stock.selected && stock.quantity > 0);
    if (selectedStocks.length === 0) {
        toast.error('Please select at least one stock and enter quantity');
        return;
    }

    setIsLoading(true); // Optional: use a loading spinner or disable buttons

    try {
        const base_url = 'http://127.0.0.1:5000';

        const purchasePromises = selectedStocks.map(stock =>
            fetch(`${base_url}/investment/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    portfolioId: selectedPortfolio.id,
                    ticker: stock.ticker,
                    price: stock.price,
                    quantity: parseInt(stock.quantity)
                })
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Failed to purchase ${stock.ticker}`);
                }
                return res;
            })
        );

        const results = await Promise.allSettled(purchasePromises);

        const failed = results.filter(r => r.status === 'rejected');
        const succeeded = results.filter(r => r.status === 'fulfilled');

        if (succeeded.length > 0) {
            toast.success(`Successfully purchased ${succeeded.length} stock(s)`);
        }

        if (failed.length > 0) {
            const failedMessages = failed.map(f => f.reason.message).join(', ');
            toast.error(`Some failed: ${failedMessages}`);
        }

        // Clear stock selections
        setStocks(stocks.map(stock => ({
            ...stock,
            selected: false,
            quantity: ''
        })));

    } catch (err) {
        console.error('Purchase error:', err);
        toast.error(err.message || 'An error occurred during purchase');
    } finally {
        setIsLoading(false);
    }
};


    const handleClear = () => {
        const newStocks = stocks.map(stock => ({
            ...stock,
            quantity: '',
            selected: false,
        }));
        setStocks(newStocks);
    };

    return (
        <div className="market-container">
            <h1>The Market</h1>
            <table className="market-table">
                <thead>
                    <tr>
                        <th>Stock Ticker</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => (
                        <tr key={stock.ticker}>
                            <td>{stock.ticker}</td>
                            <td>{stock.price}</td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={stock.quantity}
                                    onChange={(event) => handleInputChange(index, event)}
                                    disabled={!stock.selected}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={stock.selected}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="market-actions">
                <button onClick={handleSubmit}>Submit Purchase Order</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default Market;