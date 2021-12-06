import React from 'react';

export default class Category extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      

    rgbToHex(r,g,b){
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    render(){

        const { category } = this.props;

        const color1 = this.rgbToHex(Math.round(Math.random()*255),Math.round(Math.random()*255), Math.round(Math.random()*255))
        const color2 = this.rgbToHex(Math.round(Math.random()*255),Math.round(Math.random()*255), Math.round(Math.random()*255))

        return (
            <div 
                style={{ background: `linear-gradient(to top right, ${color1} 0%,${color2} 100%)`, display: 'flex', padding: '40px', alignItems: 'center', fontSize: '28px', borderRadius: '26px', width: '500px', margin: '30px', minHeight: '170px', color: '#fff', cursor: 'pointer' }}
                onClick={() => this.props.history.push({
                    pathname: '/create',
                    state: { category_id: category.id }
                    }
                )}
            >
                {category.category}
            </div>
        )
    }
}