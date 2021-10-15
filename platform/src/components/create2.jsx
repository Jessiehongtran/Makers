import React from 'react';

export default class Create2 extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div style={{width: '100%', minHeight: '100vh', display: 'flex', flexWrap: 'wrap'}}>
                <div style={{ width: '50%', height: '50%', border: '1px solid silver' }}>
                    <div className="title">IDEA</div>
                    <div className="space">
                        Lorem
                    </div>
                </div>
                <div style={{ width: '50%', height: '50%', border: '1px solid silver' }}>
                    <div className="title">TARGET USER</div>
                    <div className="space">
                        Lorem
                    </div>
                </div>
                <div style={{ width: '50%', height: '50%', border: '1px solid silver' }}>
                    <div className="title">PEOPLE</div>
                    <div className="space">
                        Lorem
                    </div>
                </div>
                <div style={{ width: '50%', height: '50%', border: '1px solid silver' }}>
                    <div className="title">IMPACT</div>
                    <div className="space">
                        Lorem
                    </div>
                </div>
            </div>
        )
    }
}