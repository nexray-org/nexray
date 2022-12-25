import Row, { rowHeight } from './Row';
import { useContext, useMemo, useState } from 'react';
import { UiContext } from '../../../context/UiContext';
import QuickList from '../../QuickList';
import { FlatChildrenWithInitData } from './types';
import { nanoid } from 'nanoid';
import cloneDeep from 'lodash.clonedeep';
import { Child } from '@basis/types';
import clsx from 'clsx';
import useDeviceSize from '../../../hooks/useDeviceSize';

export default function Tree() {
    const { activeItem } = useContext(UiContext);
    const [closedNodeIds, setClosedNodeIds] = useState<string[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string>("");

    const { height } = useDeviceSize();

    const flatData = useMemo(() => {
        const flattenNode = (node: Child | string, depth: number, result: FlatChildrenWithInitData[], path: string[]) => {
            const id = nanoid();
            console.log("node", node)
            if (typeof node === "string") {
                result.push({
                    id,
                    depth,
                    hasChildren: false,
                    type: node,
                    is: "string",
                    path
                });
            } else {
                result.push({
                    id,
                    depth,
                    hasChildren: !!node.props?.children,
                    type: node.type,
                    is: "component",
                    path
                });

                if (node.props?.children) {
                    if (Array.isArray(node.props.children)) {
                        for (const child of node.props.children) {
                            flattenNode(child, depth + 1, result, [...path, id]);
                        }
                    } else if (typeof node.props.children === "string") {
                        flattenNode(node.props.children, depth + 1, result, [...path, id]);
                    }
                }
            }
        };

        const flattenTopLevel = (treeData: Child[]) => {
            const result: FlatChildrenWithInitData[] = [];
            const path: string[] = [];
            for (const node of treeData) {
                flattenNode(node, 1, result, path);
            }
            return result;
        };

        return flattenTopLevel(activeItem?.children || []);
    }, [])

    const flatDataWithState = useMemo(() => {
        return cloneDeep(flatData).filter(ele => !ele.path.some(ele2 => closedNodeIds.includes(ele2)));
    }, [closedNodeIds, flatData]);

    const onToggleOpen = (id: string) => closedNodeIds.includes(id) ?
        setClosedNodeIds(prev => prev.filter(existingId => existingId !== id))
        :
        setClosedNodeIds(prev => [...prev, id])

    const onSelectNode = setSelectedNodeId;

    if (!activeItem?.children) {
        return <></>;
    }

    const rowRendererExtraProps = {
        flatDataWithState,
        onToggleOpen,
        closedNodeIds,
        onSelectNode
    } as const;

    return (
        <div className='flex border-t border-t-g-primary-700 pt-[4px] mt-[4px]'>
            <QuickList<FlatChildrenWithInitData[]>
                height={height - 30 - 46 - 4 - 4 - 11}
                itemCount={flatDataWithState.length}
                itemSize={rowHeight}
                itemKey={(index) => flatDataWithState[index].id}
                rowRenderer={(props) => <Row {...props} {...rowRendererExtraProps} />}
                className={clsx("flex", selectedNodeId && "basis-2/3")}
            />
            {selectedNodeId && (
                <div className={clsx("flex basis-1/3 border-l border-l-g-primary-700")}>
                </div>
            )}
        </div>
    )
}