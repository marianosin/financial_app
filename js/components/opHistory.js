
class OpHistory {
    constructor(opId, ticker, price, dateOperated,  ammount, commission, totalAmmount, quantity, eqType, currency, exchange){
        this.opId = opId
        this.ticker = ticker;
        this.price = price;
        this.dateOperated = dateOperated
        this.netAmmount = ammount;
        this.commission = commission;
        this.totalAmmount = totalAmmount;
        this.quantity = quantity;
        this.eqType = eqType
        this.currency = currency;
        this.exchange = exchange;
    }
}

export {OpHistory}