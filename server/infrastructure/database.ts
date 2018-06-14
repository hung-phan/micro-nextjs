import * as _ from "lodash";
import * as faker from "faker";

const todoData = _.range(10).map(() => ({
  id: faker.random.uuid(),
  text: faker.lorem.sentence(),
  complete: _.sample([true, false])
}));

export { todoData };
