import SnippetIcon from '../../icons/SnippetIcon';
import { Button, useClipboard, useToasts } from '@geist-ui/core';
import { useContext } from 'react';
import { UiContext } from '../../../context/UiContext';

export default function CopySnippet() {
    const { setToast } = useToasts();
    const { copy } = useClipboard();
    const { data, selectedCategoryId } = useContext(UiContext);
    const item = data.find(ele => ele.id === selectedCategoryId)!;
    
    const handler = () => {
        copy(item.contents)
        setToast({ text: 'Copied log contents' })
    }
    return (
        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100 z-20">
            <Button icon={<SnippetIcon />} width={0.25} px={0} scale={1} onClick={handler} />
        </div>
    )
}