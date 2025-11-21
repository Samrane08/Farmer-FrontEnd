import React from 'react';

const TopScorers: React.FC = () => {
    return (
        <section className="top-scorers">
            <h2>Top Scorer</h2>
            <div className="scorer">
                <div className="scorer-item">Branden Harris - 99.90%</div>
                <div className="scorer-item">Charles James - 99.76%</div>
                <div className="scorer-item">Mike Peter - 99.50%</div>
            </div>
        </section>
    );
}

export default TopScorers;
