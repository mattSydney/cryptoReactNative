class Helper {
    static trim(stringToTrim, amount) {
        if (stringToTrim === undefined) {
            return "";
        }
        
        let amountToTrim = amount ? amount : 30;
        if (stringToTrim.length > amountToTrim) {
            return stringToTrim.substring(0, amountToTrim) + '...';
        } 
            return stringToTrim; 
    }
}
export default Helper;
