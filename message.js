class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error('name type required.');
      }
      this.commands = commands;
   }
}

module.exports = Message;