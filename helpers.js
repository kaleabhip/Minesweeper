Array.prototype.containsArray = function(arr) {
    var isContained = false;
    for (i=0; i<this.length;i++) {
        isContained = true;
        if(arr.length == this[i].length){
            for (j = 0; j < arr.length; j++) {
                if(arr[j] != this[i][j]){
                    isContained = false;
                }
            }
        }
        else
        {
            isContained = false;
        }
        if (isContained){
            break;
        }
    }
    return isContained;
}