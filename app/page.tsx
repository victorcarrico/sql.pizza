import dynamic from 'next/dynamic'

const Pizza = dynamic(() => import('./ui/pizza'), {
  ssr: false,
})

export default function Page() {
    return <Pizza />
  }
