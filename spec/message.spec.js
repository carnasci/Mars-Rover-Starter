const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    let createdMessage = new Message('Test new message with 2 commands', [
        'MODE_CHANGE', 'LOW_POWER'
    ]);

    it("throws an error if a name is NOT passed a the first paramater in the function", function() {
        expect( function() { new Message();}).toThrowError(new Error('name type required.'));
    });

    it("constructor sets name as first paramater", function() {
        expect( createdMessage.name).toEqual('Test new message with 2 commands');
    });

    it("sets a commands array as the 2nd argument", function() {
        expect( createdMessage.commands).toEqual([
            'MODE_CHANGE', 'LOW_POWER'
        ]);
    });

});
