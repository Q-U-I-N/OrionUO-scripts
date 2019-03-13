function getnameall()
{
    Orion.AddObject('infobag');
    while (Orion.HaveTarget())
    {
        Orion.Wait(100);
    }
    var infobag = 'infobag'
    Orion.UseObject('infobag');
    Orion.Wait(1000);
    var list = Orion.FindType('-1','-1',infobag, '','','',true);
    for (var i = 0; i < list.length; i++)
    {
        TextWindow.Print(GetNameFromJournal(list[i]));
    }
    TextWindow.Open();
}

function GetNameFromJournal(serial, delay)
{
    var result = "", textObj, findText = "0|1|2|3|4|5|6|7|8|9|A|E|I|O|U|Y|B|C|D|F|G|H|J|K|L|M|N|P|Q|R|S|T|V|W|X|Y|Z";
    delay = delay || 1000;
    Orion.JournalIgnoreCase(true);
    Orion.ClearJournal();
    Orion.Click(serial);
    Orion.WaitJournal(findText, Orion.Now(), Orion.Now() + delay, 0, serial);
    Orion.Wait(1);
    do
    {
        textObj = Orion.InJournal(findText, "-1", serial);
        if (textObj != null)
        {
            result += textObj.Text() + " ";
            textObj.SetText(" ");
        }
    }
    while (textObj != null);
    return result;
}
