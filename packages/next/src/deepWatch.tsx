import { Fragment } from 'react';
import { deepMap, hasComplexChildren } from 'react-children-utilities';
import ClientWatcher from './client-capture/ClientWatcher';

// Concept of catching devs attaching _nextray to pass client-side analysis
// Unused for now
export default function deepWatch(
    component: JSX.Element, 
): JSX.Element {
    const watchedComponents = deepMap(component, (child, i) => {
        if (hasComplexChildren(child) && (child.props as any)['_nexray']) {
            return (
                <ClientWatcher>
                    {child}
                </ClientWatcher>
            )
        } else {
            return child
        }
    })

    return (
        <Fragment>
            {watchedComponents}
        </Fragment>
    )
}