"use client"

import { ReactNode } from "react"

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null
  return (
    <div
      className="modal-backdrop"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="card modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button className="button ghost" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
