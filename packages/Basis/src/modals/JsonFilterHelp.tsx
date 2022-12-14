import { Link, Modal } from '@geist-ui/core';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

export default function JsonFilterHelp() {
    const { isInsightFilterDialogOpen, setInsightFilterDialogOpen } = useContext(UiContext);
    return (
        <Modal visible={isInsightFilterDialogOpen} onClose={() => setInsightFilterDialogOpen(false)}>
            <Modal.Title className='!block !text-left'>Find on page</Modal.Title>
            <Modal.Content pt={0.4}>
                <p className='text-sm inline-block'>
                    This input allows you to search for text in the current log. There are two types of values that can be searched:
                    <ul className='leading-none list-none'>
                        <li>
                            Plain text: <code>TIMEOUT_ERROR</code>
                        </li>
                        <li>
                            ECMA regular expression: <code>/^a...s$/g</code>
                        </li>
                    </ul>
                    Please note that <Link color>ECMA regex</Link> is the variant that is used in JavaScript.
                </p>
            </Modal.Content>
        </Modal>
    )
}