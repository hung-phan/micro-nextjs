import * as faker from "faker";
import * as _ from "lodash";

export const todoData = _.range(10).map(id => ({
  id: id.toString(),
  complete: _.sample([true, false]),
  text: faker.lorem.sentence()
}));
