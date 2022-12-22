import { BsGithub, BsTerminalFill } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full justify-center items-center space-y-5">
            <BsTerminalFill size={"26px"} className="text-g-primary-200" />
            <AiOutlineLink size={"28px"} className="text-g-primary-600" />
            <BsGithub size={"28px"} className="text-g-primary-600" />
        </div>
    )
}