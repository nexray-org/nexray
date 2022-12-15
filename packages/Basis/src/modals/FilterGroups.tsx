import { ButtonGroup, Modal, Select, Button } from '@geist-ui/core';
import { useContext, useRef, useState } from 'react';
import { UiContext } from '../context/UiContext';
import { BsCalendar4Week } from 'react-icons/bs';
import dayjs, { Dayjs } from 'dayjs';

export default function FilterGroups() {
    const { isFilterGroupDialogOpen, setIsFilterGroupDialogOpen } = useContext(UiContext);
    const [selectedFilterRange, setSelectedFilterRange] = useState<[Dayjs, Dayjs]>([dayjs().subtract(1, 'day'), dayjs()]);
    const [customDatesPopoverOpen, setCustomDatesPopoverOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLElement>(null);

    return (
        <Modal visible={isFilterGroupDialogOpen} onClose={() => setIsFilterGroupDialogOpen(false)} width="600px">
            <Modal.Content pt={0} ref={containerRef}>
                <span className='text-xl font-bold'>Filter Log Groups</span>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col'>
                        <span className='text-g-primary-400 text-sm tracking-tight mb-1'>Sort by</span>
                        <Select
                            placeholder="Choose one"
                            initialValue="1"
                            getPopupContainer={() => containerRef.current}
                        >
                            <Select.Option value="1">Created At</Select.Option>
                            <Select.Option value="2">Created At</Select.Option>
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-g-primary-400 text-sm tracking-tight mb-1'>Created at</span>
                        <ButtonGroup
                            scale={0.5}
                        >
                            <Button value={1}>1h</Button>
                            <Button value={3}>3h</Button>
                            <Button value={12}>12h</Button>
                            <Button value={24}>1d</Button>
                            <Button value={72}>3d</Button>
                            <Button value={168}>1w</Button>
                            <Button 
                                value="custom" 
                                >
                                    Custom <BsCalendar4Week fontSize="small" className="ml-1" />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </Modal.Content>
            <Modal.Action passive onClick={() => setIsFilterGroupDialogOpen(false)}>Close</Modal.Action>
            <Modal.Action>Search</Modal.Action>
        </Modal>
    )
}