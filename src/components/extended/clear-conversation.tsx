import { Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

interface ClearConversationProps {
    clearConversation: () => void;
}

const ClearConversation = ({ clearConversation }: ClearConversationProps) => {
  return (
    <div>
        <Button onClick={clearConversation} size="icon" variant="outline">
            <Trash />
            </Button>
    </div>
  )
}

export default ClearConversation