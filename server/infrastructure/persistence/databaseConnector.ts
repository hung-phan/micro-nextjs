import * as faker from "faker";
import * as _ from "lodash";

export const todoData = _.range(10).map(() => ({
  complete: _.sample([true, false]),
  id: faker.random.uuid(),
  text: faker.lorem.sentence()
}));
