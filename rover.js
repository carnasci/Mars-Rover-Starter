class Rover {
   constructor( mode = 'NORMAL', generatorWATTS = 110, position = 87382098){
      this.mode = mode;
      this.generatorWATTS = generatorWATTS;
      this.position = position;
   }

   receiveMessage(message){
      let response = {
         message: message.name,
         results: [],
      };
      let processedCommand = {
         completed: null,
      };
      for (let i = 0; i < message.commands.length; i++){
         if (message.commands[i]){
            processedCommand.completed = true;
         } else processedCommand.completed = false;
         response.results.push(processedCommand);

         if (message.commands[i].commandType === 'STATUS_CHECK') {
            processedCommand.roverStatus = this;
         }
         if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
         }
         if (message.commands[i].commandType === 'MOVE' && this.mode === 'LOW_POWER') {
            processedCommand.completed = false;
            response.results.push(processedCommand);
         } else if (message.commands[i].commandType === 'MOVE' && this.mode !== 'LOW_POWER') {
            this.position = message.commands[i].value;
         }
      }     
      console.log(response);
            
      return response;            
      } 

}



   module.exports = Rover;