import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/home.css';

const Home = ({ user }) => {
    const [portfolioStats, setPortfolioStats] = useState({ count: 0, totalValue: 0 });
    const [userBalance, setUserBalance] = useState(0);
    const [newPortfolio, setNewPortfolio] = useState({ name: '', strategy: '' });
    const [isCreating, setIsCreating] = useState(false);

    const base_url = 'http://127.0.0.1:5000';

    useEffect(() => {
        if (!user?.isLoggedIn || !user.userId) return;

        const fetchStats = async () => {
            try {
                const [balanceRes, portfolioRes] = await Promise.all([
                    fetch(`${base_url}/user/get-balance/${user.userId}`),
                    fetch(`${base_url}/portfolio/get-all/${user.userId}`)
                ]);

                if (!balanceRes.ok || !portfolioRes.ok) throw new Error('Error fetching data');
                const balanceData = await balanceRes.json();
                const portfolios = await portfolioRes.json();

                let totalValue = 0;
            for (const p of portfolios) {
                const invUrl = `${base_url}/investment/get-all/${p.id}`;
                try {
                    const invRes = await fetch(invUrl);
                    if (!invRes.ok) {
                        console.error(`Failed to fetch investments for portfolio ${p.id}`, invRes.status);
                    } else {
                        const invs = await invRes.json();
                        totalValue += invs.reduce((sum, inv) => sum + inv.price * inv.quantity, 0);
                    }
                } catch (err) {
                    console.error(`Error fetching investments for portfolio ${p.id}:`, err);
                }
            }


                setUserBalance(balanceData.balance || 0);
                setPortfolioStats({ count: portfolios.length, totalValue });
            } catch (error) {
                console.error(error);
                toast.error('Error fetching portfolio data');
            }
        };

        fetchStats();
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newPortfolio.name || !newPortfolio.strategy) {
            toast.error('Fill all fields');
            return;
        }

        setIsCreating(true);
        try {
            const res = await fetch(`${base_url}/portfolio/create-new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newPortfolio, userId: user.userId })
            });

            if (!res.ok) throw new Error('Failed to create portfolio');
            toast.success('Portfolio created');
            setNewPortfolio({ name: '', strategy: '' });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome, {user?.user || 'Investor'} 👋</h1>
            <p>Balance: ${userBalance.toLocaleString()}</p>
            <p>Portfolios: {portfolioStats.count} | Total Value: ${portfolioStats.totalValue.toLocaleString()}</p>

            <form onSubmit={handleCreate} className="simple-form">
                <input
                    type="text"
                    placeholder="Portfolio Name"
                    value={newPortfolio.name}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Strategy (e.g., Growth)"
                    value={newPortfolio.strategy}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, strategy: e.target.value })}
                />
                <button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Portfolio'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Home;
