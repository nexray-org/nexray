import { BsGithub, BsTerminalFill } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sidebar() {
    const { asPath } = useRouter();

    const activeClassName = "bg-g-primary-700 !text-g-primary-200";
    const unactiveClassName = "h-[38px] w-[38px] flex-center rounded-lg transition-colors hover:bg-g-primary-700 cursor-pointer text-g-primary-500";
    return (
        <div className="flex flex-col h-full justify-center items-center space-y-2 pb-4">
            <Link href={"/analyze"}>
                <div className={clsx(asPath === "/analyze" && activeClassName, unactiveClassName)}>
                    <BsTerminalFill size={"22px"} className="text-inherit" />
                </div>
            </Link>

            <Link href={"/permalinks"}>
                <div className={clsx(asPath === "/permalinks" && activeClassName, unactiveClassName)}>
                    <AiOutlineLink size={"22px"} className="text-inherit" />
                </div>
            </Link>

            <a href="https://github.com/nexray/nexray" target={"_blank"} className="text-inherit">
                <div className={clsx(unactiveClassName)}>
                    <BsGithub size={"20px"} className="text-inherit" />
                </div>
            </a>

        </div>
    )
}