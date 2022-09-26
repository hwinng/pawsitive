import { Modal as AhaModal } from '@ahaui/react'
import * as React from 'react'

const callAll =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn && fn(...args))

const ModalContext = React.createContext<
  | [isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>]
  | undefined
>(undefined)
ModalContext.displayName = 'ModalContext'

function useModal() {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a Modal')
  }
  return context
}

function Modal(props: any) {
  const [isOpen, setIsOpen] = React.useState(false)
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({ children: child }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsOpen] = useModal()
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({ children: child }: any) {
  const [, setIsOpen] = useModal()
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase(props: any) {
  const [isOpen, setIsOpen] = useModal()
  return (
    <AhaModal show={isOpen} onHide={() => setIsOpen(false)}>
      {props.children}
    </AhaModal>
  )
}

type ModalContentProps = {
  title: string
  children: JSX.Element | JSX.Element[]
}
function ModalContents({ title, children }: ModalContentProps) {
  return (
    <ModalContentsBase>
      <div
        style={{
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 8px 16px rgb(0 0 0 / 16%)',
          paddingBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ModalDismissButton>
            <span aria-hidden>×</span>
          </ModalDismissButton>
        </div>
        <h3 style={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
        {children}
      </div>
    </ModalContentsBase>
  )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
