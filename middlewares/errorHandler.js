function process(error){
   return Object.values(error.errors).map(err => err.properties.message);
}

module.exports = process;