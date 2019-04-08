import React from 'react'
import { createArray } from '$lib/helpers'

const PlaceholderLines = ({ numLines = 3, className }) => (
  <div className={className}>
    {createArray(numLines).map((v, i) => <div key={i} className='placeholder-text' />)}
  </div>
)

export const PlaceholderCard = ({ className }) => (
  <div className={cn('placeholder-card', className)}>
    <div className='placeholder-image h-32 mb-2' />
    <PlaceholderLines numLines={3} className='flex flex-col items-center' />
  </div>
)

const Placeholder = ({ numLines = 3, card }) => (
  card ? (
    <PlaceholderCard />
  ) : (
    <PlaceholderLines numLines={numLines} />
  )    
)

export default Placeholder