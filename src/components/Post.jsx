import { format,formatDistanceToNow } from  'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export function Post ({author ,publishedAt,content}) {
  //Estado que armazena e avisa para o React 
  //se houve uma mudança para adicionar mais um comentario em tela 
  const [comments,setComments] = useState([
        'Post muito bacana!!',
    ])
  //Estado que armazenada os dados do textarea 
  // E avisa para o o outro estado que vai acrescentar mais um comentario e houve uma mudança 
  const [newCommentText , setNewCommentText] = useState('')

  // Formatação do horário
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale : ptBR,
  },)
  // Formatação do horário
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
    locale : ptBR,
    addSuffix:true,
  })
  // Função para alterar o um estado acrescentando novos comentarios 
  // E guardando os que ja tinha 
  function handleCreateNewComment () {
    event.preventDefault()
    setComments([...comments,newCommentText])
    setNewCommentText('')
    }
  //Função para armazenar em um estado o valor do textarea
  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
  }
  // Função que vai ser passada para o component filho para que possa
  //deletar algum comentário
  function onDeleteComment(comment) {
    console.log('Deletar comentário');
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time 
        title={publishedDateFormatted}
        dateTime={publishedAt.toISOString()}
        >
        {publishedDateRelativeToNow}
        </time>
      </header>
        <div className={styles.content}>
       {content.map(line=> {
        if (line.type=== 'paragraph') {
          return <p key={line.content}>{line.content}</p>
        }else if (line.type=== 'link') {
          return <p key={line.content}><a href='#'>{line.content}</a></p>
        }
       })}
        </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name= "comment" 
          value={newCommentText}
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
        />
      <footer>
        <button 
        type="submit"
        >
        Publicar  
        </button>
      </footer> 
      </form>
      
      <div className={styles.commentList}>

        {
        comments.map(
          comment => {
          return <Comment 
            key={comment} 
            content={comment}
            onDeleteComment={onDeleteComment}
            />
        })
        }

      </div>
    </article>
  );
}
