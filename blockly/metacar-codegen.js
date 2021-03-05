Blockly.JavaScript['forward'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveForward();\n';
  return code;
};

Blockly.JavaScript['turn'] = function(block) {
  var dropdown_turn_direction = block.getFieldValue('turn_direction');
  // TODO: Assemble JavaScript into code variable.
  if (dropdown_turn_direction === 'left') {
    return 'turnLeft();\n';
  } else { // dropdown_turn_direction == 'right'
    return 'turnRight();\n';
  }
};

Blockly.JavaScript['backward'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveBackward();\n';
  return code;
};

Blockly.JavaScript['stop'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'stop();\n';
  return code;
};

Blockly.JavaScript['sleep'] = function(block) {
  var number_millis = block.getFieldValue('millis');
  // TODO: Assemble JavaScript into code variable.
  var code = `sleep(${number_millis});\n`;
  return code;
};

Blockly.JavaScript['lidar'] = function(block) {
  var dropdown_obstacle_type = block.getFieldValue('obstacle_type');
  var dropdown_front_distance = block.getFieldValue('front_distance');
  var dropdown_lateral_distance = block.getFieldValue('lateral_distance');
  var dropdown_lateral_direction = block.getFieldValue('lateral_direction');

  const idx0 = {
    '0m': 4, '1m': 3, '2m': 2, '3m': 1, '4m': 0,
  }[dropdown_front_distance];

  let idx1;
  if (dropdown_lateral_direction === 'left') {
    idx1 = {
      '0m': 2, '1m': 1, '2m': 0,
    }[dropdown_lateral_distance];
  } else { // dropdown_lateral_direction == 'right'
    idx1 = {
      '0m': 2, '1m': 3, '2m': 4,
    }[dropdown_lateral_distance];
  }

  const obst = {
    'car': 1, 'road': -1, 'terrain': 0,
  }[dropdown_obstacle_type];

  // TODO: Assemble JavaScript into code variable.
  var code = `lidar(${idx0}, ${idx1}) === ${obst}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
