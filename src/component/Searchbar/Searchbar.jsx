import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './Searchbar.module.scss'
import { nanoid } from 'nanoid'
import { FiSearch } from 'react-icons/fi'

const Sarchbar = ({ onSubmit }) => {
  const [imageName, setimageName] = useState('')

  const handelNameInput = (event) => {
    setimageName(event.currentTarget.value.toLowerCase())
  }

  const handelSubmit = (event) => {
    event.preventDefault()
    if (imageName.trim() === '') {
      return
    }
    onSubmit(imageName)
    setimageName('')
  }

  return (
    <div className={styles.Searchbar}>
      <header className={styles.searchbar}>
        <form onSubmit={handelSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormbutton}>
            <FiSearch />
          </button>
          <input
            id={nanoid()}
            className={styles.SearchForminput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handelNameInput}
          />
        </form>
      </header>
    </div>
  )
}
Sarchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default Sarchbar
