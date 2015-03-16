/// <reference path="../../../typings/react/react-global.d.ts" />

module app {

    export function renderer<P>(renderFn:(props:P) => React.ReactElement<P>): React.ClassicComponentClass<P>  {
        return React.createClass(<React.ComponentSpec<P,any>>{
            render() {
                return renderFn(this.props);
            }
        });
    }

}
