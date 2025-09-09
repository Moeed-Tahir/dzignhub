import { Suspense } from "react"

export const metadata = {
  title: 'Edit Slides - AllMy.AI',
  description: 'Edit your AI-generated slides seamlessly with our intuitive editor. Customize content, design, and layout to create the perfect presentation for your needs.' ,
}

export default function RootLayout({ children }) {
  return (
    
        <Suspense>
        {children}
        </Suspense>
  )
}