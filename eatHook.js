/*
This code is under the GNU General Public License - Use at free will
    Credit wanted but not needed - Darkserver -
*/
 
var nowAmount;
var nowId;
var nowData;
var lastAmount;
var lastId;
var lastData;
var lastBlock;
var needAlert = false;
var lastSlotId;
var nowSlotId;
 
//add food item id's here 
var foodItems = [260,282,297,319,320,349,350,357,360,363,364,365,366,367,391,392,393,400];
 
//add inventory blocks here - or farming...
var invBlocks = [54,58,61,62,60];
 
function useItem(x,y,z,itemId,blockId){
    lastBlock = blockId; //set the last block the player tapped
    if(invBlocks.indexOf(lastBlock)>=0){
        needAlert = true; //alert the player when they hold a food item
        alert = false;
    }
    if(invBlocks.indexOf(lastBlock)>=-1){ //if the last block is not an inv block
        needAlert = false; // dont alert the player when they hold a food item
        alert = false;
    }
}
 
var tick = 0;
var alert = false;
 
function modTick(){
    //DO NOT EDIT BELOW UNLESS YOU KNOW WHAT YOU ARE DOING
    nowId = Player.getCarriedItem();
    nowData = Player.getCarriedItemData();
    nowAmount = Player.getCarriedItemCount();
    nowSlotId = Player.getSelectedSlotId();
    if(foodItems.indexOf(nowId)>=0){ //if the carried item is in foodItems array
        if(needAlert&&!alert){
            clientMessage("Please tap on a block without an inventory");
            alert = true;
        }
        tick++; //add to tick
        if(tick==20){ //if tick is 20
            tick=0; //set tick back to 0
            if(nowId==lastId){ //if the lastId & nowId match
                if(nowData==lastData){ //if the lastData & nowData match
                    if((lastId-1)==nowId){ //if the lastAmount is 1 more than nowAmount
                        if(invBlocks.indexOf(lastBlock)==-1){ //if the last block tapped was not an inv block
                            eatHook(lastId); //call eatHook
                        }
                    }
                }
            }
            lastId = Player.getCarriedItem();
            lastData = Player.getCarriedItemData();
            lastAmount = Player.getCarriedItemCount();
            lastSlotId = Player.getSelectedSlotId();
        }
    }
    //trying to fix the single item bug...
    if(nowId==0){ //if the player is now holding air
        if(nowSlotId==lastSlotId){ //if the player hasn't changed slots
            if(foodItems.indexOf(lastId)>=0){ //if the last item is in foodItems array
                if(invBlocks.indexOf(lastBlock)==-1){ //if the last block tapped wasn't an inv block
                    eatHook(lastId); //call eatHook
                    lastId=0; //set last item to 0
                }
            }
        }
    }
    //DO NOT EDIT ABOVE THIS UNLESS YOU KNOW WHAT YOU ARE DOING
}
 
function eatHook(foodId){ //when the player eats an item
    clientMessage("Debug Message: YOU ATE FOOD!");
    if(foodId==260){ //if you eat an apple
        //do this...
        clientMessage("Ate An Apple!");
    }
}
