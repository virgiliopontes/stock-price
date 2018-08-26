import React from 'react';

import Preco from './Preco';
import Grafico from './Grafico';

export default class Stocks extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            tagStock : '',
            stockPrice:'',
            companyName:'',
            dados_grafico:[{ date: '',latestPrice: '' }]
        }

        this.atualizarTag = this.atualizarTag.bind(this);
    }

    atualizarTag(e){

        this.setState({ tagStock: e.target.value });
        
    }

    salvar(stockData){

        if(stockData!==''&&stockData!=='Unknown symbol'){
            this.setState({
                stockPrice: 'USD $'+JSON.parse(stockData).latestPrice,
                companyName: JSON.parse(stockData).companyName,
            });

        }else{

            this.setState({
                stockPrice: '',
                companyName: 'Código de Ação desconhecido'
            });
          
        }

    }

    grafico(e){

        if(e!=='Unknown symbol'){
            var dadosJons = JSON.parse(e);

            this.setState({
                dados_grafico: []
            });
            
            // eslint-disable-next-line
            dadosJons.map((dados , index) => {
                this.setState({
                    dados_grafico: [...this.state.dados_grafico,{ date: dados.date ,latestPrice: dados.close }]
                });
            })

        }else{
            this.setState({
                dados_grafico: [{ date: '',latestPrice: '' }]
            });
        }

    }

    getStocksPrice = async (e) =>{

        e.preventDefault();
        const url_price = 'https://api.iextrading.com/1.0/stock/';
        var api_call_price = await fetch(url_price.concat(this.state.tagStock)+'/quote',{method:'get',mode: 'cors'});
        this.salvar(await api_call_price.text());

        var api_call_chart = await fetch(url_price.concat(this.state.tagStock)+'/chart/6m',{method:'get',mode: 'cors'});
        this.grafico(await api_call_chart.text());

    }


    render(){
        return(
            <div>
                <form onSubmit={ this.getStocksPrice }>
                    <input value={this.state.tagStock} onChange={this.atualizarTag} ></input>
                    <button type="submit">Buscar</button>
                    <Preco companyName={this.state.companyName} price={this.state.stockPrice} te='teste'/>
                    <Grafico data={this.state.dados_grafico}/>
                </form>
            </div>
        );
    }

}