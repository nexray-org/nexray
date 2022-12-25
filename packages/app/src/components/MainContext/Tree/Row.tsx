import { ListChildComponentProps } from 'react-window';
import { FlatChildrenWithInitData } from './types';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import clsx from 'clsx';
import { Code } from '@geist-ui/core';

export const rowHeight = 22;

const Row = ({
    index,
    style,
    flatDataWithState,
    onToggleOpen,
    closedNodeIds,
    onSelectNode
}: ListChildComponentProps<FlatChildrenWithInitData[]> & {
    flatDataWithState: FlatChildrenWithInitData[];
    onToggleOpen: (id: string) => void;
    closedNodeIds: string[];
    onSelectNode: (id: string) => void;
}) => {
    const node = flatDataWithState[index];
    const left = node.depth * 20;
    const rootTextClassName = "text-xs tracking-normal overflow-hidden text-ellipsis whitespace-nowrap overflow-ellipsis";
    return (
        <div
            style={style}
            className={clsx(
                "flex items-center transition-colors select-none duration-75",
                node.hasChildren && "hover:bg-g-primary-700 cursor-pointer"
            )}
        >
            {node.is === "string" ? (
                <div
                    style={{
                        paddingLeft: `${left}px`
                    }}
                    className="flex items-center"
                >
                    <span className={clsx(rootTextClassName, 'font-mono pl-4')}>&#8220;{node.type}&#8221;</span>
                </div>
            ) : (
                <div
                    style={{
                        paddingLeft: `${left}px`
                    }}
                    className="flex items-center"
                    onClick={() => onSelectNode(node.id)}
                >
                    <div
                        onClick={(e) => {
                            onToggleOpen(node.id);
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="px-2"
                    >
                        {node.hasChildren && <>{closedNodeIds.includes(node.id) ? <AiFillCaretRight size={"0.8em"} className="!text-g-primary-400" /> : <AiFillCaretDown size={"0.8em"} className="!text-g-primary-400" />}</>}
                    </div>
                    <span className={clsx(rootTextClassName, 'text-[#79ffe1]')}>{node.type}</span>
                </div>
            )}
        </div>
    )
}

export default Row;
