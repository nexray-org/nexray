import sstLogo from '../assets/sst.svg';
import serverlessLogo from '../assets/serverless-icon.svg';
import nextLogo from '../assets/nextjs.svg';
import amplifyLogo from '../assets/aws-amplify.svg';
import cloudwatchLogo from '../assets/cloudwatch.svg';
import Root from '../components/Root';
import SourceButton, { ISourceButton } from '../components/SourceButton';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();

    const sources: ISourceButton[] = [
        {
            title: 'Next.js',
            icon: nextLogo,
            isDetected: true,
            onClick: () => router.push('/configure'),
        },
        {
            title: 'Serverless Framework',
            icon: serverlessLogo,
            isDetected: true,
            imgWidthClassName: '!max-w-[24px]',
            onClick: () => router.push('/configure'),
        },
        {
            title: 'SST',
            icon: sstLogo,
            isDetected: false,
            onClick: () => router.push('/configure'),
        },
        {
            title: 'AWS Amplify',
            icon: amplifyLogo,
            isDetected: false,
            imgWidthClassName: '!max-w-[30px]',
            onClick: () => router.push('/configure'),
        },
        {
            title: 'AWS CloudWatch',
            icon: cloudwatchLogo,
            isDetected: false,
            imgWidthClassName: '!max-w-[24px]',
            onClick: () => router.push('/configure'),
        },
    ];

    return (
        <Root>
            <h1 className='text-4xl font-semibold'>Welcome to Tauri</h1>
            <h1 className='text-[1rem] mt-16 font-semibold'>Where are you collecting logs from?</h1>
            <div className='flex flex-wrap flex-row [&>button]:mt-8 [&>button]:mr-9'>
                {sources.map((ele) => (
                    <SourceButton {...ele} key={ele.title} />
                ))}
            </div>
        </Root>
    );
}
