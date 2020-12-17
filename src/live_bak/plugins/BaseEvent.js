import event from "events";
class BaseEvent extends event.EventEmitter {
  constructor() {
    super();
  }
}
export default BaseEvent;
