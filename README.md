# eatHook
eatHook has been fully added to Blocklauncher now, so this code is pointless.

to create eatHook in ModPE now, you can do -
function eatHook (halfHeartsHealed, saturation) {
  if (Player.getCarriedItem() == 260 ) {
    clientMessage('ate an apple');
  }
}

or you can setup a custom hook like so...
function myEatHook(itemId, itemData){
  if(itemId == 260 && itemData == 0){
    clientMessage('ate an apple');
  }
}

function eatHook(hearts, saturation){
  myEatHook(Player.getCarriedItem(), Player.getCarriedItemData()); //call our custom hook
}
