const mongoose = require('mongoose');

//Generating sequential IDs
const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequenceValue: {
    type: Number,
    default: 0
  }
});

//Next sequence value
//we create a static method so that it can be directly called. Ex :ab.functionname(). this function initially get userid ,if doesnt exist create it with sequence value 1 , then nnext time its 2 then 3....  
//sequence name are - userID, CampgainID, AdID
CounterSchema.statics.getNextSequence = async function(sequenceName) {
  const sequenceDocument = await this.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequenceValue: 1 } },//increasing by 1
    { new: true, upsert: true } //return updated documment //usert: true means if doc doesnot exist then create it.
  );
  return sequenceDocument.sequenceValue;
};

module.exports = mongoose.model('Counter', CounterSchema);
