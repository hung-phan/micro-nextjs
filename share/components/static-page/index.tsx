import Link from "next/link";
import * as React from "react";

class StaticPageComponent extends React.PureComponent {
  public static getInitialProps({ pathname }: { pathname: string }) {
    return { pathname };
  }

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Static Page</h1>
            <Link href="/">
              <a>Back to Home page</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StaticPageComponent;
