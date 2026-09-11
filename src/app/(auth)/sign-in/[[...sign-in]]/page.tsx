'use client';

import { SignIn } from "@clerk/nextjs";

import scss from './page.module.scss'

export default function SignInPage() {
  return (
    <div className={scss['sign-in']}>
      <SignIn path="/sign-in"/>
    </div>
  );
}
