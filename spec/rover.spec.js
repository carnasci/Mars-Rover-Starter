const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let createdRover = new Rover();
  let response = createdRover.receiveMessage(message);
  let commands2 = [new Command('STATUS_CHECK'), new Command('STATUS_CHECK')];
  let message2 = new Message('Test message for different commands', commands2);
  let createdRover2 = new Rover();
  let response2 = createdRover2.receiveMessage(message2);

  
  it('sets default values for position and MODE and generatorWATTS', function() {
    expect(createdRover2.mode).toEqual('NORMAL');
    expect(createdRover2.generatorWATTS).toEqual(110);
    expect(createdRover2.position).toEqual(87382098);
  });

  it('response returned by recieveMessage contains the name of the message', function () {
    expect(response.message).toEqual('Test message with two commands');
  });

  it('response returned by receiveMessage contains two results if two commands are sent in the message', function () {
    expect(response.results.length).toEqual(2);
  });

  it('responds correctly to the "STATUS_CHECK" command', function () {
    expect(response.results[1].roverStatus.mode).toEqual(createdRover.mode);
    expect(response.results[1].roverStatus.generatorWATTS).toEqual(createdRover.generatorWATTS);
    expect(response.results[1].roverStatus.position).toEqual(createdRover.position);
  });

  it('responds correctly to the "MODE_CHANGE" command', ()=> {
    expect(createdRover.mode).toEqual('LOW_POWER');
    expect(response.results[1].completed).toEqual(true);
  });

  it('responds with a false completed value when attempting to move in LOW_POWER mode', ()=> {
    let commands3 = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1002)];
    let message3 = new Message('Testing moving with LOW_POWER', commands3);
    let createdRover3 = new Rover();
    let response3 = createdRover3.receiveMessage(message3);
    expect(createdRover3.position).toEqual(87382098);
    expect(response3.results[1].completed).toEqual(false);
  });

  it('responds with the position for the MOVE command', ()=> {
    let commands4 = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 1002)];
    let message4 = new Message('Testing move position', commands4);
    let createdRover4 = new Rover();
    let response4 = createdRover4.receiveMessage(message4);
    expect(createdRover4.position).toBe(1002);
  });

  // 7 tests here!

});
