import type { NextPage } from "next"
import { ChatPopoverLauncher } from '@/components/motionprimitivies/chatluncher'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <ChatPopoverLauncher />
    </div>
  )
}

export default Home

