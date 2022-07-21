import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export function Comment ({content , onDeleteComment}) {
  
  const [likecount, setLikeCount] = useState(0)
  function handleLikeComment() {
    setLikeCount(likecount+1)
  }
  
  function handleDeleteComment () {
    onDeleteComment(content)
  }

  return (<div className={styles.comment}>
    <Avatar hasBorder={false} src="https://github.com/JohnRSinx.png" alt="" />

    <div className={styles.commentBox}>
      <div className={styles.commentContent}>
        <header>
          <div className={styles.authorAndTime}>
            <strong>John Rodrigues</strong>
            <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">Cerca de 1h atrás</time>
          </div>

          <button 
          onClick={handleDeleteComment}
          title="Deletar comentário"
          >
            <Trash size={24} />
          </button>
        </header>

        <p>{content}</p>
      </div>

      <footer>
        <button onClick={handleLikeComment}>
          <ThumbsUp />
          Aplaudir <span>{likecount}</span>
        </button>
      </footer>
    </div>
  </div>
  )
}