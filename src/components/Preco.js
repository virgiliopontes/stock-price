import React from 'react';

export default class Preco extends React.Component{
    render(){
        return(
            <div>
                <h1>{this.props.companyName}</h1>
                <h3>{this.props.price}</h3>
                <h3>{this.props.teste}</h3>
            </div>
           
        );
    }
}