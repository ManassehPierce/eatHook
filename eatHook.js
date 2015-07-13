/* This code is under the GNU General Public License - Use at free will
   Credit not needed - Darkserver */

//add custom food item id's here
var foodItems = [260,282,297,319,320,349,350,357,360,363,364,365,366,367,391,392,393,400];

//add blocks here that will take away any food
var invBlocks = [54,58,60,61,62,250,251,252,253];

function eatHook(foodId){ //get when the player eats an item
	if(foodId==260){ //if you eat an apple
		clientMessage("Ate An Apple!"); //does this.
	}
}

function newLevel(){
	eatAPI.getCompatibleScripts(); //Leave this line, only compatible storage mod is BetterStorage by DAW330073
}

function modTick(){
	
	eatAPI.modTick(); //Leave this line here
}

//DO NOT EDIT BELOW UNLESS YOU KNOW WHAT YOU ARE DOING
var eatAPI = {};
var nowAmount, nowId, nowData, lastAmount, lastId, lastData, lookBlock, nowSlotId, lastSlotId;
var tick = 0;

eatAPI.modTick = function(){
	lookBlock = Player.getPointedBlockId();
	nowId = Player.getCarriedItem();
	nowData = Player.getCarriedItemData();
	nowAmount = Player.getCarriedItemCount();
	nowSlotId = Player.getSelectedSlotId();
	if(foodItems.indexOf(nowId)>=0){
		tick++;
		if(tick==10){
			tick=0;
			if(nowId==lastId&&nowData==lastData&&(lastAmount-1)==nowAmount&&invBlocks.indexOf(lookBlock)==-1){
				eatHook(lastId);
			}
			lastId = Player.getCarriedItem();
			lastData = Player.getCarriedItemData();
			lastAmount = Player.getCarriedItemCount();
			lastSlotId = Player.getSelectedSlotId();
		}
	}
	if(nowId==0){
		if(foodItems.indexOf(lastId)>=0&&lastAmount==1&&nowSlotId==lastSlotId&&invBlocks.indexOf(lookBlock)==-1){
			eatHook(lastId);
			lastId=0;
		}
		else{
			lastId=0;
		}
	}
	if(foodItems.indexOf(nowId)==-1&&nowId!==0){
		lastId=0;
	}
};

eatAPI.getCompatableScripts = function() {
    var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    for(var i = 0; i < scripts.size(); i++) {
        var script = scripts.get(i);
        var scope = script.scope;
        if(org.mozilla.javascript.ScriptableObject.hasProperty(scope, "Inventory") && org.mozilla.javascript.ScriptableObject.hasProperty(scope, "BetterStorage") && org.mozilla.javascript.ScriptableObject.hasProperty(scope, "storageBlocks"))
           invBlocks.push(250,251,252,253);
	}
};
