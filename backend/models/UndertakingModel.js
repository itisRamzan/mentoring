const mongoose = require('mongoose');


const undertakingFormSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },
  pdfs: [
    
  ]
});

 

module.exports = mongoose.model('UndertakingForm', undertakingFormSchema);