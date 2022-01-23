import styles from './section.module.scss'

const Section = ({ children, title }) => {
  return (
    <section className={styles.Section}>
      <div className={styles.Container}>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

export default Section
