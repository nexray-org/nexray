import { ListChildComponentProps } from 'react-window';
import { FlatChildrenWithInitData } from './types';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import clsx from 'clsx';

export const rowHeight = 22;

const pathLeafName = (pathName: string) => pathName.split('\\').pop()!.split('/').pop();

const AsyncBadge = () => <div className='font-mono text-[6px] bg-g-primary-700 rounded-full border border-g-primary-600 ml-1'>async</div>;

const Row = ({
    index,
    style,
    flatDataWithState,
    onToggleOpen,
    closedNodeIds,
    onSelectNode,
    selectedNodeId,
}: ListChildComponentProps<FlatChildrenWithInitData[]> & {
    flatDataWithState: FlatChildrenWithInitData[];
    onToggleOpen: (id: string) => void;
    closedNodeIds: string[];
    onSelectNode: (id: string) => void;
    selectedNodeId: string;
}) => {
    const node = flatDataWithState[index];
    const left = node.depth * 20;
    const rootTextClassName = 'text-xs tracking-normal overflow-hidden whitespace-nowrap overflow-ellipsis';
    return (
        <div
            style={style}
            className={clsx(
                'flex items-center transition-colors select-none duration-75',
                node.hasChildren && 'hover:bg-g-primary-700 cursor-pointer',
                selectedNodeId === node.id && 'bg-g-primary-500 hover:bg-g-primary-500',
            )}
        >
            {node.is === 'string' ? (
                <div
                    style={{
                        paddingLeft: `${left}px`,
                    }}
                    className='flex items-center'
                >
                    {typeof node.type === "string" ? (
                        <span className={clsx(rootTextClassName, 'font-mono pl-4')}>&#8220;{node.type}&#8221;</span>
                    ) : (
                        <>
                            <span className={clsx(rootTextClassName, 'font-mono pl-4')}>{pathLeafName(node.type.filepath)}</span>
                            {node.type.async && <AsyncBadge />}
                        </>
                    )}
                </div>
            ) : (
                <div
                    style={{
                        paddingLeft: `${left}px`,
                    }}
                    className='flex items-center w-full'
                    onClick={() => onSelectNode(node.id)}
                >
                    <div
                        onClick={(e) => {
                            onToggleOpen(node.id);
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className='px-2'
                    >
                        {node.hasChildren && (
                            <>
                                {closedNodeIds.includes(node.id) ? (
                                    <AiFillCaretRight size={'0.8em'} className='!text-g-primary-400' />
                                ) : (
                                    <AiFillCaretDown size={'0.8em'} className='!text-g-primary-400' />
                                )}
                            </>
                        )}
                    </div>
                    {typeof node.type === "string" ? (
                        <span className={clsx(rootTextClassName, 'text-[#79ffe1]')}>{node.type}</span>
                    ) : (
                        <>
                            <span className={clsx(rootTextClassName, 'text-[#79ffe1]')}>{pathLeafName(node.type.filepath)}</span>
                            {node.type.async && <AsyncBadge />}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Row;
