import * as faker from "faker";
import * as _ from "lodash";

const todoData = _.range(10).map(() => ({
  complete: _.sample([true, false]),
  id: faker.random.uuid(),
  text: faker.lorem.sentence()
}));

export { todoData };
