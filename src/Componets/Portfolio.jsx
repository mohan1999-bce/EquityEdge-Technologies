import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/portfolio.css';
//import '../styles/Investment.css';


const Portfolio = ({ user }) => {
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const base_url = 'http://127.0.0.1:5000'
        const url = `${base_url}/portfolio/get-all/${user.userId}`
        fetch(url).then(res => {
            if (!res.ok) {
                toast.error(`Failed to get portfolios for user ${user.username}`)
            } else {
                res.json().then(data => {
                    setPortfolios(data)
                });
            }
        }).catch(err => {
            toast.error(`Failed to get portfolios for user ${user.username}: ${err.message}`)
        })
    }, []);

    const handleShowInvestments = (portfolio) => {
        const portfolioId = portfolio.id;
        const base_url = 'http://127.0.0.1:5000'
        const url = `${base_url}/investment/get-all/${portfolioId}`
        fetch(url).then(res => {
            if (!res.ok) {
                res.json().then((message) => {
                    toast.error(`Failed to get investments: ${message}`)
                })
            } else {
                res.json().then(data => {
                    setInvestments(data);
                    setSelectedPortfolio(portfolio.name);
                })
            }
        }).catch(err => {
            toast.error(`An error occured while fetching investments: ${err.message}`)
        })
    }

    const handleSellInvestment = (investment) => {
        const investId = investment.id
        const quantityToSell = parseInt(prompt(`Enter quantity to sell for ${investment.ticker}:`));
        if (isNaN(quantityToSell) || quantityToSell <= 0) {
            toast.error('Invalid quantity entered.');
            return;
        }
        const salePrice = parseFloat(prompt(`Enter the sale price for ${investment.ticker}:`))
        if (isNaN(salePrice) || salePrice <= 0) {
            toast.error('Invalid sale price entered.');
            return;
        }
        const base_url = 'http://127.0.0.1:5000'
        const url = `${base_url}/investment/sell`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                investmentId: investId,
                qty: quantityToSell,
                price: salePrice
            })
        }).then(res => {
            if (!res.ok) {
                res.json().then(data => {
                    toast.error(`Failed to sell investment ${investment.ticker}: ${data.message}`)
                })
            } else {
                toast.success(`Successully sold ${quantityToSell} of ${investment.ticker} at ${salePrice}`);
            }
        }).catch(err => {
            toast.error(`An error occured while making the fetch call to sell the investment: ${err.message}`)
        })
    };

    return (<>
        <h1>User Portfolios</h1>
        {portfolios.length > 0 ? (
            <table className="portfolio-table">
                <thead>
                    <tr>
                        <th>Portfolio Name</th>
                        <th>Strategy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolios.map((portfolio) => (
                        <tr key={portfolio.id}>
                            <td>{portfolio.name}</td>
                            <td>{portfolio.strategy}</td>
                            <td>
                                <button
                                    onClick={() => handleShowInvestments(portfolio)}
                                >
                                    Show
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No portfolios found.</p>
        )}
        <h1>Investments</h1>
        {investments.length > 0 ? (
            <div className="investments-container">
                <table className="investments-table">
                    <thead>
                        <tr>
                            <th>Portfolio</th>
                            <th>Ticker</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map((investment) => (
                            <tr key={investment.id}>
                                <td>{selectedPortfolio}</td>
                                <td>{investment.ticker}</td>
                                <td>{investment.price}</td>
                                <td>{investment.quantity}</td>
                                <td>{investment.date}</td>
                                <td>
                                    <button
                                        onClick={() => handleSellInvestment(investment)}
                                    >
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            selectedPortfolio ? <p>No investments</p> :
                <p>Select a portfolio to show investments</p>
        )}
        <ToastContainer />

    </>)

}

export default Portfolio