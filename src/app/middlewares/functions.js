const filterParams = (inputObject) => {
    
    for (let params in inputObject){
        !inputObject[params] && delete inputObject[params]
        return inputObject 
    }
}

module.exports = { filterParams }
