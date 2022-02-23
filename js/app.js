//Item class. This class represents a type of item of my aplication. In this case trading records.
class Trade {
    constructor(data) {
        this.id = data.id;
        this.ticker = data.ticker;
        this.price = data.price;
        this.quantity = data.quantity;
        this.broker = data.broker;
        this.eqType = data.eqType;
        this.opType = data.opType;
        this.comission = 0;
        this.netCost = 0;
        this.totalCost = 0;
    }
    costCalculator(){
        this.netCost = this.price*this.quantity;
        this.totalCost = this.netCost*1.0075;
        this.comission = this.netCost*0.0075;
    }
}

//Trading Records model. This turns the previus objet to a real item on the page

class DataModel {
    constructor(){
        const tradeHistory = JSON.parse(localStorage.getItem('TRADE_HISTORY')) || []; //Searcha for a local DB and returns a empty list if not found
        this.tradeHistory = tradeHistory.map(trade => new Trade(trade)); //Gives Trade object properties
    }

    saveRecord(){
        localStorage.setItem('TRADE_HISTORY', JSON.stringify(this.tradeHistory));
    }

    addRecord(record){
        this.tradeHistory.push(new Trade(record)); //Adds trade record to DB
        this.saveRecord(); //Saves it to LS
    }

    removeRecord(id) {
        this.tradeHistory = this.tradeHistory.filter(record => record.id !== id)
    }

    searchRecord(id){
        return this.tradeHistory.find(record => record.id === id)
    }
}

//App viewr class. This class contains all functions related to building the dom


class AppViewer {
    recordForm(parent, callback){
        $(parent).html(
            `
            <section id="addRecordForm">
                <input type="text" class="form-control" id="ticker" placeholder="Ticker">
                <input type="number" class="form-control" id="price" placeholder="Price">
                <input type="number" class="form-control" id="quantity" placeholder="Quantity">
                <input type="text" class="form-control" id="eqType" placeholder="Equity type">
                <label for="opType">Buy or sell</label>
                <input class="form-check-input" name="opType" type="radio" id="buyOption" value="buy"><label for="buyOption">Buy</label>
                <input class="form-check-input" name="opType" type="radio" id="sellOption" value="sell" ><label for="sellOption">Sell</label>
                <button id="btnEnviar">ENVIAR</button>
                
            </section>
            `
        );
        $("#btnEnviar").click(callback);// same space as the html
    }
    //Show data

    listRecord(parent,  data, callback){
        $(parent).html(`
        <table>
        <th>
            
                <td>
                    id
                </td>
                <td>
                    Ticker
                </td>
                <td>
                    Price
                </td>
                <td>
                    Quantity
                </td>
                <td>
                    Exchange
                </td>
                <td>
                    Equity type
                </td>
                <td>
                    Operation type
                </td>
                <td>
                    Commision
                </td>
                <td>
                    Net cost
                </td>
                <td>
                    Total cost
                </td>
                
            
        </th>
        <tbody id="listRecordBody">
            
        </tbody>
                        `)
        let html = '';
        //This for loop walks the data and appends it to html
        for (const record in data) {
            html += `
            <tr>
            <td>
                ${record.id}
            </td>
            <td>
            ${record.ticker}
            </td>
            <td>
            ${record.price}
            </td>
            <td>
            ${record.quantity}
            </td>
            <td>
            ${record.broker}
            </td>
            <td>
            ${record.eqType}
            </td>
            <td>
            ${record.opType}
            </td>
            <td>
            ${record.comission}
            </td>
            <td>
            ${record.netCost}
            </td>
            <td>
            ${record.totalCost}
            </td>
            <td>
                <input type="button" value="x" class="delRecord">
            </td>
        </tr>
                    `;
            
        };
        $(parent).html(html);
        $('.delRecord').click(callback)
    }
    //Show search results we change name as searchRecord is already used

    showRecord(parent, callback){
        $(parent).html(
            `
            <section>
                <h1>Search history</h1>
                <input type ="number">
                <button id="searchBtn">Search</button>
            </section>
            `
        );
        $("#searchBtn").click(callback);
    }

}


// Class to generate the controlling 

class AppController{
    // This class compiles everything in one single class and runs all the  functions generated before.
    constructor(dataModel, appViewer){
        this.dataModel = dataModel;
        this.appViewer = appViewer;
    }

    add(app){
        this.appViewer.recordForm(app, (event) => {
            let children = $(event.target).parent().children(); //Goes up to parent and talks to its children
            console.log(children)
            this.dataModel.addRecord(
                {
                    id: this.dataModel.tradeHistory.length +1,
                    ticker: children[0].value,
                    price: children[1].value,
                    quantity: children[2].value,
                    eqType: children[3].value,
                    opType: children[4].value

                });
        });

    }

    list(app){
        this.appViewer.listRecord(app,this.dataModel.tradeHistory, 
            (event) => {
                this.dataModel.removeRecord()
            });
    }
    search(app){
        this.appViewer.showRecord(app, (event) =>{
            let children = $(event.target).parent().children();
            let id = parseInt(children[0].value);
            let found = this.dataModel.searchRecord(id);
            console.log(found)
        });
    }
}
const ErrorComponent = (parent) => {
    $(parent).html("<h2>Error 404</h2>");
}