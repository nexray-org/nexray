import Root from '../components/Root';
import { BsArrowRight } from 'react-icons/bs';
import { Button } from "@primer/react";
import FlexibleLink from '../components/FlexibleLink';

export default function Configure() {
  return (
    <Root showBack>
      <h1 className="text-4xl font-semibold">Welcome to Tauri!</h1>
      <h1 className="mt-1">Let's get started</h1>
      <FlexibleLink href="/analyze">
        <Button
          trailingIcon={() => <BsArrowRight size={18} className="mt-[1px]" />}
          className="!mt-8"
        >
          Continue
        </Button>
      </FlexibleLink>
    </Root>
  );
}