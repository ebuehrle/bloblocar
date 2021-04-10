Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("vorwärts");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Vorwärts fahren.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["nach links abbiegen","left"], ["nach rechts abbiegen","right"]]), "turn_direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Auf der Stelle drehen.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("rückwärts");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Rückwärts fahren.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("stop");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Stehenbleiben.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['sleep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("warte")
        .appendField(new Blockly.FieldNumber(500, 0, Infinity, 1), "millis")
        .appendField("Millisekunden");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Eine gewisse Zeit abwarten und weiterfahren.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['lidar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("da ist")
        .appendField(new Blockly.FieldDropdown([["ein Auto","car"], ["eine Straße","road"], ["etwas anderes","terrain"]]), "obstacle_type")
        .appendField(new Blockly.FieldDropdown([["2m hinter mir","0m"], ["1m hinter mir","1m"], ["0m vor mir","2m"], ["1m vor mir","3m"], ["2m vor mir","4m"]]), "front_distance")
        .appendField(new Blockly.FieldDropdown([["0m","0m"], ["1m","1m"], ["2m","2m"]]), "lateral_distance")
        .appendField(new Blockly.FieldDropdown([["links von mir","left"], ["rechts von mir","right"]]), "lateral_direction");
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
