require("jsdom-global/register");

const Enzyme = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");
const React = require("react");

Enzyme.configure({ adapter: new Adapter() });

// disable ssr issue
React.useLayoutEffect = React.useEffect;
