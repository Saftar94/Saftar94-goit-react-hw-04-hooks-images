import React, { useReducer, useEffect } from 'react'
import FetchApi from '../ApiServer/ApiServer'
import styles from './ImageGalleryItem.module.scss'
import ImageGalleryItem from './ImageGalleryItem.jsx'
import Button from '../Button/Button'
import { Grid } from 'react-loader-spinner'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return {
        ...state,
        image: [],
        status: 'pending',
        imageName: action.payload,
      }
    case 'resolved':
      return {
        ...state,
        image: [...state.image, ...action.payload],
        status: 'resolved',
      }
    case 'rejected':
      return { ...state, error: action.payload, status: 'rejected' }
    case 'MorePage':
      return {
        ...state,
        page: state.page + 1,
      }
    default:
      throw new Error()
  }
}

const ImageGallery = ({ imageName, onClick }) => {
  const [state, dispatch] = useReducer(reducer, {
    imageName: '',
    image: [],
    status: 'idle',
    error: null,
    page: 1,
    myRef: React.createRef(),
  })
  useEffect(() => {
    if (!imageName) {
      return
    }
    if (imageName !== state.imageName)
      dispatch({ type: 'pending', payload: imageName })
    FetchApi(imageName, state.page)
      .then((image) => {
        if (image.hits.length === 0) {
          return Promise.reject(
            new Error(`No results were found for your search.`),
          )
        }
        image.hits[0] = { ...image.hits[0], myRef: state.myRef }
        dispatch({ type: 'resolved', payload: image.hits })
        scrollInto(state.myRef)
      })
      .catch((error) => dispatch({ type: 'rejected', payload: error }))
  }, [imageName, state.myRef, state.page, state.imageName])

  const MorePage = () => {
    dispatch({ type: 'MorePage' })
  }
  const scrollInto = (elem) => {
    elem.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }
  return (
    <>
      {state.status === 'idle' && (
        <p className={styles.InputValue}>Input value</p>
      )}
      {state.status === 'rejected' && (
        <h1 className={styles.ErrorName}>{state.error.message}</h1>
      )}
      {state.image.length > 0 && (
        <ul className={styles.Ullist}>
          {state.image.map((img) => (
            <ImageGalleryItem
              key={img.id}
              srcs={img.webformatURL}
              alt={img.tags}
              onClick={onClick}
              largeImageURL={img.largeImageURL}
              myRef={img.myRef}
            />
          ))}
        </ul>
      )}
      {state.status === 'pending' && (
        <Grid
          heigth="100"
          width="100"
          color="red"
          ariaLabel="loading"
          timeout={3000}
        />
      )}
      {state.status === 'resolved' && <Button onClick={MorePage} />}
    </>
  )
}

export default ImageGallery
