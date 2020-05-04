import React from 'react'

const Rank = ({name, entries, id}) => {
    return (
        <div>
            <div className = "white f3">
                {`${name}, your Current Rank is...`}
            </div>
            <div className = "white f1">
                {`${entries}`}
            </div>
        </div>

    );
}

export default Rank;