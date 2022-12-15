import { Link, Modal } from '@geist-ui/core';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

export default function JsonFilterHelp() {
    const { isInsightFilterDialogOpen, setInsightFilterDialogOpen } = useContext(UiContext);
    return (
        <Modal visible={isInsightFilterDialogOpen} onClose={() => setInsightFilterDialogOpen(false)} width="680px">
            <Modal.Title className='!block !text-left'>Filter JSON Objects</Modal.Title>
            <Modal.Content pt={0.4}>
                <p className='text-sm inline-block'>
                    Filter JSON objects with <Link target={"_blank"} color href="https://goessner.net/articles/JsonPath/index.html#e2">JSONPath</Link>, a powerful traversal
                    and parsing syntax. These examples demonstrate various functions of JSON structure that represents a book store:
                    <ul className='leading-none list-none'>
                        {[
                            {
                                code: "$.store.books[*].author",
                                description: "The authors of all books"
                            },
                            {
                                code: "$.store.books[4:6]",
                                description: "All books in the range of 4-6"
                            },
                            {
                                code: "$.store.books[-1:]",
                                description: "The last book"
                            },
                            {
                                code: "$.store.books[?(@.price < 20)].title",
                                description: "The title of all books less than $20"
                            }
                        ].map(ele => (
                            <li className='flex' key={ele.description}>
                                <span className='min-w-[275px] font-bold'>{ele.description}:</span><code>{ele.code}</code>
                            </li>
                        ))}
                    </ul>
                    See more <Link target={"_blank"} color href='https://support.smartbear.com/alertsite/docs/monitors/api/endpoint/jsonpath.html'>examples here</Link>.
                </p>
            </Modal.Content>
        </Modal>
    );
}
