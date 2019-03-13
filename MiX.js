/** Upload exact ammount of types and colors *from *to container.
 * -------------------------------------------------------------------------------------------
 * Upload('0x1BF2|0x19B8|0x19B9', '-1', '50', 'ResourceContainer', 'self')
 * Upload('0x1BF2|0x19B8|0x19B9', '0x000|0x003|0004', '50', 'ResourceContainer', 'self')
 * -------------------------------------------------------------------------------------------
 * @param {[type]} Upload_itemtypes          [list of types uploading]
 * @param {[color]} Upload_itemtypescolor    [list of colors regarding to type list uploading]
 * @param {[number]} Upload_ammount          [ammount to upload]
 * @param {[ID]} Upload_from                    [Start Uploading items from]
 * @param {[ID]} Upload_to                   [Finish Uploading items to]
 */
function Upload(Upload_itemtypes, Upload_itemtypescolor, Upload_ammount, Upload_from, Upload_to) {
    var list = Orion.FindType(Upload_itemtypes, Upload_itemtypescolor, Upload_from, '', '0', '', true);
    for (var i = 0; i < list.length; i++) {
        Orion.MoveItem(list[i], Upload_ammount, Upload_to);
        checklag(50000);
        Orion.Wait(600);
    }
}
/** Restock adaptive ammount of types and colors *from *to container.
 * -------------------------------------------------------------------------------------------
 *  Restock2([['0x0F88', 15, 0x0000], ['0x0F7B', 25, 0x0000], ['0x0F7A', 35, 0x0000], ['0x0F84', 45, 0x0000], ['0x0F8C', 55, 0x0000], ['0x0F85', 65, 0x0000]], '0x4054553D','self');
 *  Restock2([['0x0F88', 15, -1], ['0x0F7B', 25, 0x0000]], '0x4054553D','self');
 * -------------------------------------------------------------------------------------------
 * @param {[type, ammount, color]} Upload_itemtypes     [Blocks of type ammount and color]
 * @param {[ID]} Restock_source                         [Restock source container ID]
 * @param {[ID]} Restock_container                      [Restock destination container ID]
 */
function Restock2(Restock_Items, Restock_source, Restock_container) {
    var CurrentItem = Restock_Items;
    var CurrentRow = CurrentItem.length;
    for (i = 0; i < CurrentRow - 1; i++) {
        var CurrentItemLocal = Orion.Count(CurrentItem[i][0]);
        if (CurrentItemLocal < CurrentItem[i][1]) {
            itemfound = Orion.FindType(CurrentItem[i][0], CurrentItem[i][2], Restock_source);
            if (itemfound.length) {
                Orion.MoveItem(itemfound[0], CurrentItem[i][1] - CurrentItemLocal, Restock_container);
                checklag(50000);
                Orion.Wait(600);
            }
        }
    }
}
/**
 * Function to output information for debuging purposes.
 * -------------------------------------------------------------------------------------------
 * Debug('We are here and now');
 * -------------------------------------------------------------------------------------------
 * @param {[string]} inputtext [Messages for debugging]
 */
function Debug(inputtext) {
    var DebugMessages = true;
    if (DebugMessages) {
        Orion.Print('--  ' + inputtext + '  --');
        Orion.CharPrint(self, 1153, '--  ' + inputtext + '  --');
        if (!TextWindow.Open()) {
            TextWindow.Open();
        }
        TextWindow.Print(Orion.Time('hh:mm:ss') + '--  ' + inputtext + '  --');
    }
}
/**
 * Function to check for lags.
 * -------------------------------------------------------------------------------------------
 * checklag('50000');
 * -------------------------------------------------------------------------------------------
 * @param {[string]} TimeOut [Click backpack and await reply from server]
 */
function checklag(TimeOut) {
    BeforeAction = Orion.Now();
    AfterAction = Orion.Now() + TimeOut;
    Orion.Click(backpack);
    Orion.WaitJournal('backpack', BeforeAction, AfterAction, '');
}

//----------------------------
//----------------------------
function Test() {
    Restock2([
        // Restock [type, ammount, color], from, to
        ['0x0F88', 15, 0x0000], //
        ['0x0F7B', 25, 0x0000], //
        ['0x0F7A', 35, 0x0000], //
        ['0x0F84', 45, 0x0000], //
        ['0x0F8C', 55, 0x0000], //
        ['0x0F85', 65, 0x0000], //
        ['0x0F86', 75, 0x0000], //
        ['0x0F8D', 85, 0x0000], //
        ['0x0F09', 90, 0x0000], //
        ['0x0F0C', 5, 0x0000], //
        ['0x0F0B', 3, 0x0512], // Invisibility potion
        ['0x0E21', 100, 0x0000], //
        ['0x1F5F', 20, 0x0000], //
        ['0x1F49', 20, 0x0000], //
        ['0x1F4A', 20, 0x0000], //
        ['0x1F50', 15, 0x0000], //
        ['0x1F4C', 6, 0x0000], //
        ['0x1F52', 12, -1] //
    ], '0x4054553D', 'backpack');
    // Upload back to storage from backpack
    Upload('0x0F88|0x0F7B|0x0F7A|0x0F84|0x0F85|0x0F8C|0x0F86|0x0F8D|0x0F09|0x0F0C|0x0F0B|0x0E21|0x1F5F|0x1F49|0x1F4A|0x1F50|0x1F4C|0x1F52', '-1', '3600', 'self', '0x4054553D');
}
// Print over your char
function CharPrintDelayed(serial, color, text) {
    var oldUse = Orion.OptionScaleSpeech();
    var oldDelay = Orion.OptionScaleSpeechDelay();
    Orion.OptionScaleSpeech(true);
    Orion.OptionScaleSpeechDelay(50);
    Orion.CharPrint(serial, color, text);
    Orion.Wait(50);
    Orion.OptionScaleSpeech(oldUse);
    Orion.OptionScaleSpeechDelay(oldDelay);
}

//***********************************************************************
//***********************************************************************
//---------------and these are for managing targets----------------------

// Attack Closest enemy; No guildwars, even friends are being attacked.
function PvPattack() {
    var players = Orion.FindType('0x0190|0x0191', '-1', ground, 'near|mobile', '25', 'red|gray|criminal');
    if (players.length) Orion.Attack(players[0]);
}

// Attack Next Player ignore friends, attack enemy guilds
function AttackNextPlayer() {
    Orion.Ignore(self);
    var target = Orion.FindType("-1", "-1", "ground", "human|near|live|ignorefriends", 18, "gray|criminal|orange|red");
    if (target.length != 0) {
        Orion.Attack(target[0]);
        Orion.Ignore(target[0]);
    } else {
        Orion.IgnoreReset();
        Orion.Ignore(self);
        target = Orion.FindType("-1", "-1", "ground", "human|near|live|ignorefriends", 18, "gray|criminal|orange|red");
        if (target.length != 0) {
            Orion.Attack(target[0]);
            Orion.Ignore(target[0]);
        }
    }
}

// PKAttack Next ; Ignore friends attack everybody else
function PKAttackNextPlayer() {
    Orion.Ignore(self);
    var target = Orion.FindType("-1", "-1", "ground", "human|near|live|ignorefriends", 18, "gray|criminal|orange|red|innocent|blue");
    if (target.length != 0) {
        Orion.Attack(target[0]);
        Orion.Ignore(target[0]);
    } else {
        Orion.IgnoreReset();
        Orion.Ignore(self);
        target = Orion.FindType("-1", "-1", "ground", "human|near|live|ignorefriends", 18, "gray|criminal|orange|red|innocent|blue");
        if (target.length != 0) {
            Orion.Attack(target[0]);
            Orion.Ignore(target[0]);
        }
    }
}
//cast spell with a given name on player u have attacked
function CastAttackedEnemy(spellName) {
    Orion.Cast(spellName, 'lastattack');
}

//cast spell with a given name on yourself
function CastSelf(spellName) {
    Orion.Cast(spellName, 'self');
}

// cast to nearest injured friend
function CastNearestInjuredFriend(spellName) {
    var friendSerialString = Orion.FindFriend('injured|live', '18');
    if (!friendSerialString.length) {
        Orion.Print('-1', 'Found no friends nearby');
        return;
    }
    Orion.Cast(spellName, serial);
}

//cast spell with a given name on your chosenFriend which is a saved Serial in Lists -> Objects
//or make a new one
function CastFriend(spellName) {
    var chosenFriend = Orion.FindObject('chosenFriend');
    if (chosenFriend == null || chosenFriend == 0) {
        Orion.Print('-1', 'No chosen friend found');
        Orion.Print('-1', 'Target a mobile to mark him as your chosen friend.');
        Orion.AddObject('chosenFriend');
        while (Orion.HaveTarget()) {
            Orion.Wait('50');
        }
        chosenFriend = Orion.FindObject('chosenFriend');
        //Orion.AddFriendList(chosenFriend.Serial()); need to implement
    }
    Orion.Print('-1', 'try cast friend ' + chosenFriend.Name());
    Orion.Cast(spellName, chosenFriend.Serial());
}
//cast spell with a given name on target
function CastTargetedEnemy(spellName) {
    Orion.Cast(spellName, 'lasttarget');
}
//helper function for AttacktNextHuman() and TargetNextHuman()
function FindNearestHumanEnemy() {
    Orion.Ignore('self');
    var friends = Orion.GetFriendList();
    for (var i = 0; i < friends.length; i++) {
        Orion.Ignore(friends[i]);
    }
    var humans = Orion.FindType('0x0190|0x0191', '-1', ground, 'near|mobile', '18', 'red|gray|criminal');
    if (!humans.length) {
        Orion.Print('-1', 'no humans found, resetting ignore list');
        Orion.IgnoreReset();
        return '';
    }
    return humans[0];
}

//This function will swap between players in range of 18 and attack them.
function AttacktNextHuman() {
    var serial = FindNearestHumanEnemy();
    if (!serial.length) return;
    CharPrintDelayed(serial, '30', 'ATTACKING');
    Orion.OrionLastAttack(serial);
    Orion.Attack(serial);
    Orion.Ignore(serial);
}

//This function will swap between players in range of 18 and target them.
function TargetNextHuman() {
    var serial = FindNearestHumanEnemy();
    if (!serial.length) return;
    CharPrintDelayed(serial, '30', 'TARGET');
    Orion.OrionLastTarget(serial);
    //Orion.TargetObject(serial);
    Orion.Ignore(serial);
}
// This function attack the selected target
function AttackSelected() {
    Orion.Attack("lasttarget");
}

// This function attack the selected target
function Attacklastattack() {
    Orion.Attack("lastattack");
}

//This function will swap between your nearby friends from your friend list
function SwitchFriend() {
    var friend = Orion.FindFriend('next', '18');
    if (!friend.length) {
        Orion.Print('-1', 'There are no friends nearby');
        return;
    }
    Orion.AddObject('chosenFriend', friend);
}

//Recursive search
function FindSerialRecursive(friendsAmount, friends, i) {
    if (friendsAmount - 1 != i) {
        friend = Orion.FindObject(friends[i + 1]);
        if (friend == null) return FindSerialRecursive(friendsAmount, friends, i + 1);
        else return friend;
    } else {
        //loop over friends again and take the first one which is neaby
        for (var c = 0; i < friendsAmount; c++) {
            friend = Orion.FindObject(friends[c]);
            if (friend != null) return friend;
        }
    }
}
