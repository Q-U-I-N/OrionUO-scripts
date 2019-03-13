function tamingka4() {
  while (!Player.Dead()) {
    //var stopMsg = "Вы успешно приручили это существо|У вас недостаточно прокачан навык Animal Taming чтобы приручить это существо|Вы не можете приручать голодных животных";
    var stopMsg = "You are not able to tame this animal|Toto zvire nedokazes ochocit|toto zvire nelze ochocit|You are not able to tame|not tamable";
    //var secondtry = "Вам не удается приручить существо|You fail to tame the creature";
    var secondtry = "Ochoceni se nezdarilo|Your taming failed";
    //var toofar = 'Цель находится слишком далеко от вас|Цель находится вне зоны видимости';
    var toofar = "You can't see the target|Jsi moc daleko"";
    var tame = Orion.FindType('!0x0190|!0x0191', '0xFFFF', ground, 'near|mobile|live', '18');
    if (tame.length) {
      var serial = tame[0];
      var obj = Orion.FindObject(serial);
      while (obj.Exists()) {
        if (Orion.GetDistance(obj) > 1)
          Orion.WalkTo(obj.X(), obj.Y(), 0, 0);
        Orion.ClearJournal();
        BeforeAction = Orion.Now();
        AfterAction = Orion.Now() + 25000;
        Orion.WaitTargetObject(serial);
        Orion.UseType('0x13F4');
        if (Orion.WaitJournal(stopMsg + '|' + secondtry + '|' + toofar, BeforeAction, AfterAction, '', '')) {
          if (Orion.InJournal(stopMsg)) {
            Orion.Wait(500);
            Orion.Ignore(serial)
            break;
          }
          if (Orion.InJournal(secondtry)) {
            Orion.Wait(500);
            continue;
          }
          if (Orion.InJournal(toofar)) {
            Orion.Wait(500);
            Orion.WalkTo(obj.X(), obj.Y(), 0, 0);
            continue;
          }
        }
      }
      Orion.Wait(100);
    }
  }
  Orion.Wait(100);
}
