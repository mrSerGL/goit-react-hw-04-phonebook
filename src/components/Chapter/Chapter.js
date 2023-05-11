import PropTypes from 'prop-types';
import css from './Chapter.module.css'

function Chapter({ title, children }) {
  return (
    <div className={css.section}>
      {title && <h2 className={css.chapterTitle}>{title}</h2>}
      {children}
    </div>
  );
}

Chapter.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Chapter;
