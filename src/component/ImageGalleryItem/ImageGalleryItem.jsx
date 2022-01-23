import PropTypes from 'prop-types'
import styles from './ImageGalleryItem.module.scss'

const ImageGalleryItem = ({ srcs, alt, onClick, largeImageURL, myRef }) => {
  return (
    <>
      {myRef ? (
        <li
          onClick={() => onClick(largeImageURL, alt)}
          ref={myRef}
          loading="lazy"
          className={styles.List}
        >
          <img className={styles.imageGalerry} alt={alt} src={srcs} />
        </li>
      ) : (
        <li
          className={styles.List}
          onClick={() => onClick(largeImageURL, alt)}
          loading="lazy"
        >
          <img className={styles.imageGalerry} src={srcs} alt={alt} />
        </li>
      )}
    </>
  )
}

ImageGalleryItem.propTypes = {
  srcs: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  myRef: PropTypes.object,
}
export default ImageGalleryItem
