const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

Enzyme.configure({ adapter: new Adapter() });

// disable ssr issue
React.useLayoutEffect = React.useEffect
