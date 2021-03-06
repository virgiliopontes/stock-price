import React from 'react';
import Grafico from '../../components/Grafico';
import styled from 'styled-components';

const Title = styled.label`
    font-size: 1em;
    text-align: center;
    color: black;
`;

const MarketCap = valor =>{
    if((valor/1000000000000)>=1){
        return (valor/1000000000000).toFixed(3)+'T';
    }

    if((valor/100000000)>=1){
        return (valor/100000000).toFixed(3)+'B';
    }

    if((valor/100000)>=1){
        return (valor/100000).toFixed(3)+'M';
    }
}

const tabela = porps =>{
    if(porps.dataStock.marketCap!==undefined && porps.dataStock.marketCap!=='' ){

        return( 
            <table style={{width:500, height:300}}>
                <tr>
                    <th>                   
                        Market Cap: {MarketCap(porps.dataStock.marketCap)}
                    </th>
                    <th>
                        Open: U$ {porps.dataStock.open}
                    </th>
                </tr>
                <tr>
                    <th>
                        Low Price: U$ {porps.dataStock.low}
                    </th>
                    <th>
                        High Price: U$ {porps.dataStock.high}
                    </th>
                </tr>
                <tr>
                    <th>
                        52 Week Range: {porps.dataStock.week52High} - {porps.dataStock.week52Low}
                    </th>
                    <th>
                        
                    </th>
                </tr>
            </table>
        );

    }else{
        return '';
    }
 
}

const getStocksPrice = async props =>{

    const url_price = 'https://api.iextrading.com/1.0/stock/';
    var api_call_price = await fetch(url_price.concat(props.tagStock)+'/quote',{method:'get',mode: 'cors'});
    salvar(await api_call_price.text(),props);

    var api_call_chart = await fetch(url_price.concat(props.tagStock)+'/chart/6m',{method:'get',mode: 'cors'});
    MontarGrafico(await api_call_chart.text(),props);

}

var salvar = (stockData,props) =>{

    var  dataStock =    {
        'stockPrice': '',
        'companyName' : 'Código de Ativo desconhecido',
        'marketCap':  '',
        'open': '',
        'high': '',
        'low': '',
        'week52High': '',
        'week52Low': ''
    }

    if(stockData!==''&&stockData!=='Unknown symbol'&&stockData!=='Not Found'){
       console.log(stockData);
       var dataJson = JSON.parse(stockData);
       dataStock.stockPrice = dataJson.latestPrice;

       //LEFT JOIN entre Arrays
       Object.assign(dataStock,dataJson);
    }

    props.setValues(dataStock);
}

var MontarGrafico = (mapa,props) =>{
    var dados_grafico=[];

    if(mapa!=='Unknown symbol' && mapa!=='Forbidden'){
        var dadosJons = JSON.parse(mapa);

       
        dados_grafico = [];
      
        
        // eslint-disable-next-line
        dadosJons.map((dados , index) => {
            
            dados_grafico = [...dados_grafico,{ date: dados.date ,latestPrice: dados.close }]
            
        })

    }else{
        
        dados_grafico = [{ date: '',latestPrice: '' }]
        
    }

    props.setDataChart(dados_grafico);

}

const FormComponent = props => (
    <form onSubmit={(event) => {
        event.preventDefault();
        props.submitAction();
        getStocksPrice(props);
    }}>
        <h1>Digite o Código do Ativo abaixo:</h1>
        <div>
            <Title>Ação:</Title>
            <input onChange={event => props.textAction(event.target.value)} value={props.tagStock} ></input>
            <button type="submit">Buscar</button>
        </div>
       
        <div>
            <h1>{props.dataStock.companyName}</h1>
            <h3>{props.dataStock.stockPrice==undefined ? '' : 'USD $'+props.dataStock.stockPrice}</h3>
        </div>
        <center>
            <table>
                <tr>
                    <th>
                        {tabela(props)}
                    </th> 
                    <th>
                        <Grafico data={props.dataChart}/>
                    </th>
                </tr>      
            </table>
        </center>
    </form>
);

export default FormComponent;