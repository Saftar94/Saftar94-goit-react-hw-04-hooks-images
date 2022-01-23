import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'

const modalRoot = document.querySelector('#modal-root')

const Modalwindow = ({ src, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown)
    return () => {
      window.removeEventListener('keydown', handelKeyDown)
    }
  }, [])

  const handelKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose(null, null)
    }
  }
  const handelBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose(null, null)
    }
  }

  return createPortal(
    <div className={styles.ModalBack} onClick={handelBackdropClick}>
      <div className={styles.Modal}>
        <button type="button" onClick={onClose}>
          Close
        </button>
        <img className={styles.imageModule} src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  )
}

export default Modalwindow
