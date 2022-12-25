import { ListChildComponentProps } from 'react-window';
import { FlatChildrenWithInitData } from './types';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import clsx from 'clsx';
import { Code } from '@geist-ui/core';

export const rowHeight = 24;

const Row = ({ 
    index, 
    style, 
    flatDataWithState,
    onToggleOpen,
    closedNodeIds
}: ListChildComponentProps<FlatChildrenWithInitData[]> & { 
    flatDataWithState: FlatChildrenWithInitData[]; 
    onToggleOpen: (id: string) => void;
    closedNodeIds: string[];
}) => {
    const node = flatDataWithState[index];
    const left = node.depth * 20;
    const rootTextClassName = "text-xs tracking-normal overflow-hidden text-ellipsis whitespace-nowrap overflow-ellipsis";
    return (
        <div
            style={style}
            className={clsx(
                "flex items-center transition-colors select-none",
                node.hasChildren && "hover:bg-g-primary-700 cursor-pointer"
            )}
        >
            <div
                style={{
                    paddingLeft: `${left}px`
                }}
                className="flex items-center"
            >
                <div
                    onClick={() => onToggleOpen(node.id)}
                    className="py-0.5 px-2"
                >
                    {node.hasChildren && <>{closedNodeIds.includes(node.id) ? <AiFillCaretRight size={"0.8em"} className="!text-g-primary-400" /> : <AiFillCaretDown size={"0.8em"} className="!text-g-primary-400" />}</>}
                </div>
                {node.is === "string" ? (
                    <span className={clsx(rootTextClassName, 'font-mono')}>&#8220;{node.type}&#8221;</span>
                ) : (
                    <span className={clsx(rootTextClassName, 'text-[#79ffe1]')}>{node.type}</span>
                )}
            </div>
        </div>
    )
}

export default Row;
