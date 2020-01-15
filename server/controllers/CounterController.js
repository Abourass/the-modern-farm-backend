const Counter = require('../models/CountersModel');

class CounterController {
  async createCounter(id, initialNumber){
    const counter = new Counter({
      "_id": id.toString(),
      "sequence_value": parseInt(initialNumber, 10)
    });
    return await counter.save();
  }
  async increaseCounter(id, amount){
    let counter = await Counter.findOne({_id: id});
    if (!counter){counter = await this.createCounter(id, 0)}
    counter["sequence_value"] += amount;
    return await counter.save();
  }
  async decreaseCounter(id, amount){
    const counter = await Counter.findById(id);
    counter["sequence_value"] -= amount;
    return await counter.save();
  }
  async getCounter(id){
    return await Counter.findById(id);
  }
}
module.exports = new CounterController();
