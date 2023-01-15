import { ButtonGroup, Modal, Select, Button, Popover } from '@geist-ui/core';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { UiContext } from '../context/UiContext';
import { BsCalendar4Week } from 'react-icons/bs';
import dayjs, { Dayjs } from 'dayjs';
import clsx from 'clsx';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// This modal is not used yet
export default function FilterGroups() {
    const { isFilterGroupDialogOpen, setIsFilterGroupDialogOpen } = useContext(UiContext);
    const [selectedFilterRange, setSelectedFilterRange] = useState<[Dayjs, Dayjs]>([dayjs().subtract(1, 'day'), dayjs()]);
    const [customFilterRange, setCustomFilterRange] = useState<[Dayjs | undefined, Dayjs | undefined]>([dayjs().subtract(1, 'day'), dayjs()]);
    const [customDatesPopoverOpen, setCustomDatesPopoverOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLElement>(null);

    const usingCustomDateRange = useMemo(() => {
        return !!customFilterRange[0];
    }, [customFilterRange]);

    return (
        <Modal visible={isFilterGroupDialogOpen} onClose={() => setIsFilterGroupDialogOpen(false)} width='600px'>
            <Modal.Content pt={0} ref={containerRef}>
                <span className='text-xl font-bold'>Filter Log Groups</span>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    <SettingsGroup title='Sort by'>
                        <Select placeholder='Choose one' initialValue='1' getPopupContainer={() => containerRef.current}>
                            <Select.Option value='1'>Created At</Select.Option>
                            <Select.Option value='2'>Created At</Select.Option>
                        </Select>
                    </SettingsGroup>
                    <SettingsGroup title='Created at' className='col-span-2'>
                        <Popover />
                        <div>
                            <ButtonGroup scale={3 / 5} className='!m-0'>
                                {(
                                    [
                                        [1, '1h'],
                                        [3, '3h'],
                                        [12, '12h'],
                                        [24, '1d'],
                                        [72, '3d'],
                                        [168, '1w'],
                                        [
                                            'custom',
                                            <span className='flex-center'>
                                                <span className='min-w-[50px] text-left'>Custom</span> <BsCalendar4Week className='scale-125' />
                                            </span>,
                                        ],
                                    ] as const
                                ).map(([value, title]) =>
                                    value === 'custom' ? (
                                        <Button
                                            key={'' + value}
                                            onClick={() => {
                                                setCustomDatesPopoverOpen(true);
                                            }}
                                            scale={3 / 5}
                                            className={clsx('!flex !font-bold', usingCustomDateRange && '!bg-g-primary-200 !text-g-primary-700')}
                                        >
                                            <Popover
                                                content={() => (
                                                    <DayPicker
                                                        mode='range'
                                                        selected={{
                                                            from: customFilterRange[0] ? customFilterRange[0].toDate() : undefined,
                                                            to: customFilterRange[1] ? customFilterRange[1].toDate() : undefined,
                                                        }}
                                                        onSelect={(range) => {
                                                            if (range) {
                                                                setCustomFilterRange([dayjs(range.from), dayjs(range.to)]);
                                                            } else {
                                                                setCustomFilterRange([undefined, undefined]);
                                                            }
                                                        }}
                                                    />
                                                )}
                                                visible={customDatesPopoverOpen}
                                                onVisibleChange={setCustomDatesPopoverOpen}
                                            >
                                                {title}
                                            </Popover>
                                        </Button>
                                    ) : (
                                        <Button
                                            key={'' + value}
                                            onClick={() => {
                                                setCustomFilterRange([undefined, undefined]);
                                                setSelectedFilterRange([dayjs().subtract(value, 'hours'), dayjs()]);
                                            }}
                                            className={clsx(
                                                '!font-bold',
                                                !usingCustomDateRange &&
                                                    value === selectedFilterRange[1]!.diff(selectedFilterRange[0], 'hours') &&
                                                    '!bg-g-primary-200 !text-g-primary-700',
                                            )}
                                            scale={3 / 5}
                                        >
                                            {title}
                                        </Button>
                                    ),
                                )}
                            </ButtonGroup>
                        </div>
                    </SettingsGroup>
                </div>
            </Modal.Content>
            <Modal.Action passive onClick={() => setIsFilterGroupDialogOpen(false)}>
                Close
            </Modal.Action>
            <Modal.Action>Search</Modal.Action>
        </Modal>
    );
}

interface ISettingsGroup {
    className?: string;
    children: React.ReactNode;
    title: string;
}

function SettingsGroup({ children, className, title }: ISettingsGroup) {
    return (
        <div className={clsx('flex flex-col', className)}>
            <span className='text-g-primary-400 text-sm tracking-tight mb-1'>{title}</span>
            {children}
        </div>
    );
}
